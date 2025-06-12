const db = require('../config/db');

exports.submitLaporan = async (req, res) => {
  const conn = await db.getConnection();
  try {
    let {
      kategori, judul, isi, tanggal, lokasi, nama, kontak, anonim
    } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Bukti pendukung wajib diunggah.' });
    }

    // Sanitasi input agar tidak undefined atau null
    lokasi = lokasi ? lokasi.trim() : '';
    nama = nama ? nama.trim() : null;
    kontak = kontak ? kontak.trim() : null;

    // Validasi dan format tanggal, asumsi format input bisa 'YYYY-MM-DD'
    // Kalau tanggal invalid, default ke tanggal hari ini
    const parsedTanggal = new Date(tanggal);
    if (isNaN(parsedTanggal.getTime())) {
      tanggal = new Date().toISOString().slice(0, 10); // format 'YYYY-MM-DD'
    } else {
      tanggal = parsedTanggal.toISOString().slice(0, 10);
    }

    const buktiBuffer = file.buffer;

    await conn.beginTransaction();

    const [result] = await conn.query(`
      INSERT INTO laporan
      (kategori, judul, isi, bukti, tanggal, lokasi, nama, kontak, anonim)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [ kategori, judul, isi, buktiBuffer, tanggal, lokasi, nama, kontak, (!nama || nama.trim() === '' || anonim === 'on') ? 1 : 0 ]
    );

    console.log('Hasil INSERT:', result);
    const insertId = result.insertId;

    await conn.query(`
      INSERT INTO status_kasus (id_laporan, status) VALUES (?, 'dikaji')
    `, [insertId]);

    await conn.commit();

    res.status(201).json({ message: 'Laporan berhasil disimpan.', id: insertId });

  } catch (err) {
    await conn.rollback();
    console.error('Gagal simpan laporan:', err);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  } finally {
    conn.release();
  }
};

// Ambil semua laporan dari database
exports.getAllLaporan = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        laporan.id,
        laporan.kategori,
        laporan.judul,
        laporan.isi,
        laporan.tanggal,
        laporan.lokasi,
        IF(laporan.anonim = 1, 'Anonim', laporan.nama) AS nama,
        laporan.anonim,
        status.status 
    FROM laporan
    LEFT JOIN status_kasus AS status ON status.id_laporan = laporan.id
    ORDER BY laporan.tanggal DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error('Gagal ambil data laporan:', err);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil laporan.' });
  }
};


exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log(`UpdateStatus request id=${id} status=${status}`); // debug

  if (!['dikaji', 'diselidiki', 'selesai'].includes(status)) {
    return res.status(400).json({ error: 'Status tidak valid.' });
  }

  try {
    const [existing] = await db.query(
      'SELECT * FROM status_kasus WHERE id_laporan = ?',
      [id]
    );

    if (existing.length > 0) {
      await db.query(
        'UPDATE status_kasus SET status = ?, updated_at = NOW() WHERE id_laporan = ?',
        [status, id]
      );
    } else {
      await db.query(
        'INSERT INTO status_kasus (id_laporan, status) VALUES (?, ?)',
        [id, status]
      );
    }

    res.json({ message: 'Status berhasil diperbarui.' });
  } catch (err) {
    console.error('Gagal update status:', err);
    res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui status.' });
  }
};


exports.getLaporanById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT
        laporan.id,
        laporan.kategori,
        laporan.judul,
        laporan.isi,
        laporan.tanggal,
        laporan.lokasi,
        IF(laporan.anonim = 1, 'Anonim', laporan.nama) AS nama,
        laporan.anonim,
        status.status,
        laporan.bukti
      FROM laporan
      LEFT JOIN status_kasus AS status ON status.id_laporan = laporan.id
      WHERE laporan.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Laporan tidak ditemukan' });
    }

    const laporan = rows[0];
    // Buat URL base64 untuk gambar bukti
    const gambarUrl = `data:image/jpeg;base64,${laporan.bukti.toString('base64')}`;
    delete laporan.bukti;
    laporan.gambarUrl = gambarUrl;

    res.json(laporan);
  } catch (err) {
    console.error('Gagal mengambil detail laporan:', err);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil laporan.' });
  }
};

exports.deleteLaporan = async (req, res) => {
  const { id } = req.params;
  const conn = await db.getConnection(); // Get a connection from the pool
  try {
    await conn.beginTransaction(); // Start a transaction

    // First, delete related entries in status_kasus table
    // This is important because status_kasus likely has a foreign key to laporan.
    await conn.query('DELETE FROM status_kasus WHERE id_laporan = ?', [id]);

    // Then, delete the report from the laporan table
    const [result] = await conn.query('DELETE FROM laporan WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      await conn.rollback(); // Rollback if no row was deleted (report not found)
      return res.status(404).json({ error: 'Laporan tidak ditemukan.' });
    }

    await conn.commit(); // Commit the transaction
    res.json({ message: 'Laporan berhasil dihapus.' });
  } catch (err) {
    await conn.rollback(); // Rollback on error
    console.error('Gagal menghapus laporan:', err);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghapus laporan.' });
  } finally {
    conn.release(); // Release the connection back to the pool
  }
};
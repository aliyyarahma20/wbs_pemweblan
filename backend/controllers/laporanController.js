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

    const insertId = result.insertId;

    await conn.query(`
      INSERT INTO status_kasus (id_laporan, status) VALUES (?, 'dikaji')
    `, [insertId]);

    await conn.commit();

    res.status(201).json({ message: 'Laporan berhasil disimpan.' });

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

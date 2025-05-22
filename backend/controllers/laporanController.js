const db = require('../config/db');

exports.submitLaporan = async (req, res) => {
  try {
    const {
      kategori, judul, isi, tanggal, lokasi, nama, kontak, anonim
    } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Bukti pendukung wajib diunggah.' });
    }

    // Ambil file dari memory
    const buktiBuffer = file.buffer;

    // Simpan ke database sebagai BLOB
    await db.query(`
      INSERT INTO laporan 
      (kategori, judul, isi, bukti, tanggal, lokasi, nama, kontak, anonim) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      kategori,
      judul,
      isi,
      buktiBuffer,
      tanggal,
      lokasi || '',
      nama || null,
      kontak || null,
      anonim ? 1 : 0
    ]);

    res.status(201).json({ message: 'Laporan berhasil disimpan.' });

  } catch (err) {
    console.error('Gagal simpan laporan:', err);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
};

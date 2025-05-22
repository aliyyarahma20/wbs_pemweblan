const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.submitLaporan = async (req, res) => {
try {
    const {
    kategori, judul, isi, tanggal, lokasi, nama, kontak, anonim
    } = req.body;

    const file = req.file;

    if (!file) {
    return res.status(400).json({ error: 'Bukti pendukung wajib diunggah.' });
    }

    // Baca isi file (buffer) dari path sementara
    const buktiBuffer = fs.readFileSync(file.path);

    // Hapus file sementara dari folder uploads setelah dibaca
    fs.unlink(file.path, (err) => {
    if (err) console.warn('Gagal hapus file sementara:', err);
    });

    // Simpan ke DB
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

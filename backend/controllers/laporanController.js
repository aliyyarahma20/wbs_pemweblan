const db = require('../config/db'); // asumsi kamu pakai file ini untuk koneksi db
const CryptoJS = require('crypto-js');

exports.kirimLaporan = async (req, res) => {
  try {
    const {
      kategori, judul, isi, tanggal, lokasi, nama, kontak, anonim
    } = req.body;

    const bukti = req.file;

    if (!bukti) return res.status(400).json({ message: 'Bukti tidak ditemukan' });

    // Enkripsi file bukti (gunakan kunci simpanan)
    const key = process.env.AES_KEY || 'kunci_rahasia';
    const encryptedBukti = CryptoJS.AES.encrypt(bukti.buffer.toString('base64'), key).toString();

    // Masukkan data ke database
    const sql = `
      INSERT INTO laporan (kategori, judul, isi, tanggal, lokasi, nama, kontak, anonim, bukti, bukti_mime)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      kategori,
      judul,
      isi,
      tanggal,
      lokasi || '',
      anonim === 'true' ? null : nama,
      anonim === 'true' ? null : kontak,
      anonim === 'true',
      encryptedBukti,
      bukti.mimetype
    ];

    await db.execute(sql, values);

    res.status(200).json({ message: 'Laporan berhasil dikirim' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengirim laporan' });
  }
};

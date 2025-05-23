const express = require('express');
const multer = require('multer');
const { submitLaporan, getAllLaporan } = require('../controllers/laporanController');



const router = express.Router();

// Simpan file langsung di memory (buffer), bukan di disk
const upload = multer({ storage: multer.memoryStorage() });

// POST endpoint untuk menerima laporan
router.post('/laporan', upload.single('bukti'), submitLaporan);
router.get('/laporan', getAllLaporan); // <--- Tambahan ini

module.exports = router;

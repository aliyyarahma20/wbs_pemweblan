const express = require('express');
const multer = require('multer');
const { submitLaporan } = require('../controllers/laporanController');

const router = express.Router();

// Setup multer untuk menyimpan file sementara di folder 'uploads'
const upload = multer({ dest: 'uploads/' });

// POST endpoint untuk menerima laporan
router.post('/laporan', upload.single('bukti'), submitLaporan);

module.exports = router;

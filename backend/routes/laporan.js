const express = require('express');
const router = express.Router();
const laporanController = require('../controllers/laporanController');
const multer = require('multer');

// Setup multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route untuk menerima form data
router.post('/', upload.single('bukti'), laporanController.kirimLaporan);

module.exports = router;

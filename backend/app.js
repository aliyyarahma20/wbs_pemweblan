const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Endpoint login admin
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    const rawData = fs.readFileSync('./credentials.json');
    const credentials = JSON.parse(rawData);

    if (username === credentials.username && password === credentials.password) {
        res.status(200).json({ success: true, message: 'Login berhasil' });
    } else {
        res.status(401).json({ success: false, message: 'Username atau password salah' });
    }
});

// Endpoint untuk mengupload laporan
const laporanRoutes = require('./routes/laporan');
app.use('/api/laporan', laporanRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Backend berjalan di http://localhost:${PORT}`);
});

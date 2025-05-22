import React, { useState } from 'react';
import axios from 'axios';
import '../../public/css/style.css';

const User = () => {
  const [formData, setFormData] = useState({
    kategori: '',
    judul: '',
    isi: '',
    tanggal: '',
    lokasi: '',
    nama: '',
    kontak: '',
    anonim: false
  });

  const [bukti, setBukti] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setBukti(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bukti) {
      alert('Bukti pendukung wajib diunggah.');
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('bukti', bukti);

    try {
      const res = await axios.post('http://localhost:5000/api/laporan', data);
      console.log(res.data);
      setShowMessage(true);
      setFormData({
        kategori: '',
        judul: '',
        isi: '',
        tanggal: '',
        lokasi: '',
        nama: '',
        kontak: '',
        anonim: false
      });
      setBukti(null);
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat mengirim laporan.');
    }
  };

  return (
    <div className="container mt-5">
      <img src="/images/logo.png" alt="Logo" className="form-logo" />
      <h2><strong>WBS (Whistleblowing System) - Bersama Jaga Integritas</strong></h2>
      <p className="lead">Silakan isi form di bawah ini untuk melaporkan kejadian yang mencurigakan.</p>

      {showMessage && (
        <div className="alert alert-success">
          Laporan Anda telah diterima, terima kasih sudah melapor.
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="kategori" className="form-label">Kategori Laporan</label>
          <select className="form-select" name="kategori" id="kategori" value={formData.kategori} onChange={handleChange} required>
            <option value="">-- Pilih Kategori --</option>
            <option value="korupsi">Korupsi</option>
            <option value="pelecehan">Pelecehan</option>
            <option value="kekerasan">Kekerasan</option>
            <option value="penipuan">Penipuan</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="judul" className="form-label">Judul Laporan</label>
          <input type="text" className="form-control" name="judul" id="judul" value={formData.judul} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="isi" className="form-label">Isi Laporan</label>
          <textarea className="form-control" name="isi" id="isi" rows="5" value={formData.isi} onChange={handleChange} required></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="bukti" className="form-label">Bukti Pendukung (Wajib Di Isi)</label>
          <input type="file" className="form-control" name="bukti" id="bukti" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" required />
        </div>

        <div className="mb-3">
          <label htmlFor="tanggal" className="form-label">Tanggal Kejadian</label>
          <input type="date" className="form-control" name="tanggal" id="tanggal" value={formData.tanggal} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="lokasi" className="form-label">Lokasi Kejadian</label>
          <input type="text" className="form-control" name="lokasi" id="lokasi" value={formData.lokasi} onChange={handleChange} />
        </div>

        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" name="anonim" id="anonim" checked={formData.anonim} onChange={handleChange} />
          <label className="form-check-label" htmlFor="anonim">Melapor secara Anonim</label>
        </div>

        {!formData.anonim && (
          <div id="identitasFields" className="fade-toggle visible">
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">Nama Pelapor</label>
              <input type="text" className="form-control" name="nama" id="nama" value={formData.nama} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="kontak" className="form-label">Kontak (Email/No Tlp)</label>
              <input type="text" className="form-control" name="kontak" id="kontak" value={formData.kontak} onChange={handleChange} />
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary">Kirim Laporan</button>
      </form>
    </div>
  );
};

export default User;
// import React, { useState } from 'react';
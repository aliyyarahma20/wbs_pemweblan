import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css';

function FormLaporan() {
  const [formData, setFormData] = useState({
    kategori: '',
    judul: '',
    isi: '',
    bukti: null,
    tanggal: '',
    lokasi: '',
    anonim: false,
    nama: '',
    kontak: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Laporan Anda telah diterima, terima kasih sudah melapor.");
    // TODO: Implement backend submission (fetch/axios)
    console.log(formData);
  };

  return (
    <div className="container mt-5">
      <img src="/images/logo.png" alt="Logo" className="form-logo" />
      <h2><strong>WBS (Whistleblowing System) - Bersama Jaga Integritas</strong></h2>
      <p className="lead">Silakan isi form di bawah ini untuk melaporkan kejadian yang mencurigakan.</p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Kategori */}
        <div className="mb-3">
          <label htmlFor="kategori" className="form-label">Kategori Laporan</label>
          <select className="form-select" name="kategori" value={formData.kategori} onChange={handleChange} required>
            <option value="">-- Pilih Kategori --</option>
            <option value="korupsi">Korupsi</option>
            <option value="pelecehan">Pelecehan</option>
            <option value="kekerasan">Kekerasan</option>
            <option value="penipuan">Penipuan</option>
            <option value="lainnya">Lainnya (Bisa diketik di bagian isi)</option>
          </select>
        </div>

        {/* Judul */}
        <div className="mb-3">
          <label htmlFor="judul" className="form-label">Judul Laporan</label>
          <input type="text" className="form-control" name="judul" value={formData.judul} onChange={handleChange} required />
        </div>

        {/* Isi */}
        <div className="mb-3">
          <label htmlFor="isi" className="form-label">Isi Laporan</label>
          <textarea className="form-control" name="isi" rows="5" value={formData.isi} onChange={handleChange} required></textarea>
        </div>

        {/* Bukti */}
        <div className="mb-3">
          <label htmlFor="bukti" className="form-label">Bukti Pendukung</label>
          <input type="file" className="form-control" name="bukti" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" onChange={handleChange} required />
        </div>

        {/* Tanggal */}
        <div className="mb-3">
          <label htmlFor="tanggal" className="form-label">Tanggal Kejadian</label>
          <input type="date" className="form-control" name="tanggal" value={formData.tanggal} onChange={handleChange} required />
        </div>

        {/* Lokasi */}
        <div className="mb-3">
          <label htmlFor="lokasi" className="form-label">Lokasi Kejadian</label>
          <input type="text" className="form-control" name="lokasi" value={formData.lokasi} onChange={handleChange} />
        </div>

        {/* Anonim */}
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" name="anonim" checked={formData.anonim} onChange={handleChange} />
          <label className="form-check-label" htmlFor="anonim">Melapor secara Anonim</label>
        </div>

        {/* Identitas Pelapor */}
        {!formData.anonim && (
          <div>
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">Nama Pelapor</label>
              <input type="text" className="form-control" name="nama" value={formData.nama} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="kontak" className="form-label">Kontak</label>
              <input type="text" className="form-control" name="kontak" value={formData.kontak} onChange={handleChange} />
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary">Kirim Laporan</button>
      </form>
    </div>
  );
}

export default FormLaporan;

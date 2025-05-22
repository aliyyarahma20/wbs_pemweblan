import React from 'react';
import '../assets/css/AdminDashboard.css';


const AdminDashboard = ({ total, dikaji, diselidiki, selesai, laporanBaru }) => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <img src="../images/logo-admin.png" alt="Logo" className="sidebar-logo" />
        <a href="./admin_dashboard" className="active">Dashboard</a>
        <a href="./laporan_list">Daftar Laporan</a>
        <a href="./login">Logout</a>
      </div>

      <div className="content">
        <h1>Dashboard Admin</h1>

        <div className="summary">
          <div className="card">Total Laporan: {total}</div>
          <div className="card">Dikaji: {dikaji}</div>
          <div className="card">Diselidiki: {diselidiki}</div>
          <div className="card">Selesai: {selesai}</div>
        </div>

        <div className="inbox">
          <h3>Laporan Baru (Status: dikaji)</h3>

          {laporanBaru && laporanBaru.length > 0 ? (
            laporanBaru.map((laporan, index) => (
              <div className="laporan" key={index}>
                <strong>{laporan.judul}</strong><br />
                <em>{laporan.kategori} - {laporan.tanggal}</em><br />
                Lokasi: {laporan.lokasi}<br />
                Nama: {laporan.anonim ? 'Anonim' : laporan.nama}
              </div>
            ))
          ) : (
            <p>Tidak ada laporan baru.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

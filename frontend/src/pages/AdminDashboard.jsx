import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/AdminDashboard.css';

const AdminDashboard = () => {
  const [laporanBaru, setLaporanBaru] = useState([]);
  const [total, setTotal] = useState(0);
  const [dikaji, setDikaji] = useState(0);
  const [diselidiki, setDiselidiki] = useState(0);
  const [selesai, setSelesai] = useState(0);

  useEffect(() => {
  axios.get('http://localhost:3001/laporan')
    .then((res) => {
      const data = res.data;
      setLaporanBaru(data);
      setTotal(data.length);
      setDikaji(data.filter(l => l.status === 'dikaji').length);
      setDiselidiki(data.filter(l => l.status === 'diselidiki').length);
      setSelesai(data.filter(l => l.status === 'selesai').length);
    })
    .catch((err) => {
      console.error("Gagal ambil laporan:", err);
    });
}, []);

  
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getPriorityClass = (prioritas) => {
    return `priority-${prioritas}`;
  };

  const getPriorityDotClass = (prioritas) => {
    return `dot-${prioritas}`;
  };
  
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            📊
          </div>
          <div className="sidebar-title">Admin Panel</div>
          <div className="sidebar-subtitle">Dashboard</div>
        </div>
        
        <nav className="sidebar-nav">
          <a href="./admin_dashboard" className="active">
            <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </a>
          <a href="./laporan_list">
            <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
            Daftar Laporan
          </a>
          <a href="#">
            <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Manajemen User
          </a>
        </nav>
        
        <div className="sidebar-logout">
          <a href="./login">
            <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Header */}
        <div className="content-header">
          <div className="header-content">
            <div>
              <h1 className="header-title">Dashboard Admin</h1>
              <p className="header-subtitle">Selamat datang kembali! Berikut ringkasan laporan hari ini.</p>
            </div>
            <div className="header-date">
              <div className="date-label">Hari ini</div>
              <div className="date-value">{getCurrentDate()}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Summary Cards */}
          <div className="summary">
            <div className="card blue">
              <div className="card-content">
                <div className="card-info">
                  <h3>Total Laporan</h3>
                  <p>{total}</p>
                </div>
                <div className="card-icon">
                  📄
                </div>
              </div>
              <div className="card-trend">
                <span className="trend-up">↗ +12%</span>
                <span className="trend-text">dari bulan lalu</span>
              </div>
            </div>

            <div className="card orange">
              <div className="card-content">
                <div className="card-info">
                  <h3>Dikaji</h3>
                  <p>{dikaji}</p>
                </div>
                <div className="card-icon">
                  🕐
                </div>
              </div>
              <div className="card-trend">
                <span className="trend-up">↗ +8%</span>
                <span className="trend-text">dari bulan lalu</span>
              </div>
            </div>

            <div className="card purple">
              <div className="card-content">
                <div className="card-info">
                  <h3>Diselidiki</h3>
                  <p>{diselidiki}</p>
                </div>
                <div className="card-icon">
                  👁️
                </div>
              </div>
              <div className="card-trend">
                <span className="trend-up">↗ +15%</span>
                <span className="trend-text">dari bulan lalu</span>
              </div>
            </div>

            <div className="card green">
              <div className="card-content">
                <div className="card-info">
                  <h3>Selesai</h3>
                  <p>{selesai}</p>
                </div>
                <div className="card-icon">
                  ✅
                </div>
              </div>
              <div className="card-trend">
                <span className="trend-up">↗ +22%</span>
                <span className="trend-text">dari bulan lalu</span>
              </div>
            </div>
          </div>

          {/* Reports Section */}
          <div className="inbox">
            <div className="inbox-header">
              <div>
                <h3 className="inbox-title">Laporan Baru (Status: Dikaji)</h3>
                <p className="inbox-subtitle">Laporan yang perlu ditinjau segera</p>
              </div>
              <span className="inbox-badge">
                {laporanBaru?.length || 0} Laporan Baru
              </span>
            </div>
            
            <div className="inbox-content">
              {laporanBaru.filter(laporan => laporan.status === 'dikaji').length > 0 ? (
                laporanBaru
                  .filter(laporan => laporan.status === 'dikaji')
                  .map((laporan, index) => (
                    <div className="laporan" key={index}>
                      <div className="laporan-header">
                        <div style={{ flex: 1 }}>
                          <h4 className="laporan-title">{laporan.judul}</h4>
                          <p>Status: <strong>{laporan.status || 'Belum Ada'}</strong></p>
                          
                          <div className="laporan-meta">
                            <div className="meta-item">📅 {new Date(laporan.tanggal).toLocaleDateString('id-ID', {
                                timeZone: 'Asia/Jakarta',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </div>

                            <div className="meta-item">📍 {laporan.lokasi}</div>
                            <div className="meta-item">
                              👤 {laporan.anonim === '1' || laporan.anonim === 1 ? 'Anonim' : laporan.nama}
                            </div>

                          </div>
                        </div>
                        <div className="laporan-actions">
                          <button className="btn-review">Tinjau</button>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📄</div>
                  <p className="empty-title">Tidak ada laporan</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
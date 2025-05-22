import React from 'react';
import '../assets/css/AdminDashboard.css';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ 
  total = 125, 
  dikaji = 15, 
  diselidiki = 35, 
  selesai = 75, 
  laporanBaru = [
    {
      judul: "Kerusakan Jalan di Jl. Sudirman",
      kategori: "Infrastruktur",
      tanggal: "2024-05-20",
      lokasi: "Jl. Sudirman No. 123",
      nama: "Ahmad Rizki",
      anonim: false,
      prioritas: "tinggi"
    },
    {
      judul: "Pencemaran Lingkungan di Kali Brantas",
      kategori: "Lingkungan",
      tanggal: "2024-05-19",
      lokasi: "Kali Brantas, Malang",
      nama: "Anonim",
      anonim: true,
      prioritas: "sedang"
    },
    {
      judul: "Pelayanan Publik Buruk di Kelurahan",
      kategori: "Pelayanan Publik",
      tanggal: "2024-05-18",
      lokasi: "Kelurahan Dinoyo",
      nama: "Sari Dewi",
      anonim: false,
      prioritas: "rendah"
    }
  ]
}) => {
  
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

            <Link to="/laporan_list">
            <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
            </svg>
            Daftar Laporan
            </Link>

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
              {laporanBaru && laporanBaru.length > 0 ? (
                laporanBaru.map((laporan, index) => (
                  <div className="laporan" key={index}>
                    <div className="laporan-header">
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <h4 className="laporan-title">{laporan.judul}</h4>
                          <span className={`priority-badge ${getPriorityClass(laporan.prioritas)}`}>
                            {laporan.prioritas}
                          </span>
                        </div>
                        
                        <div className="laporan-meta">
                          <div className="meta-item">
                            <span className="category-badge">{laporan.kategori}</span>
                          </div>
                          <div className="meta-item">
                            📅 {laporan.tanggal}
                          </div>
                        </div>
                        
                        <div className="laporan-meta">
                          <div className="meta-item">
                            📍 {laporan.lokasi}
                          </div>
                          <div className="meta-item">
                            👤 {laporan.anonim ? 'Anonim' : laporan.nama}
                          </div>
                        </div>
                      </div>
                      
                      <div className="laporan-actions">
                        <div className={`priority-dot ${getPriorityDotClass(laporan.prioritas)}`}></div>
                        <button className="btn-review">
                          Tinjau
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    📄
                  </div>
                  <p className="empty-title">Tidak ada laporan baru</p>
                  <p className="empty-subtitle">Semua laporan telah ditinjau</p>
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/laporan_list.css"; // Import CSS file
import { useNavigate } from "react-router-dom"; 
import { Link } from 'react-router-dom';
import LogoLight from '../assets/img/logolight.png'; 

const LaporanList = () => {
  const [laporan, setLaporan] = useState([]);
  const navigate = useNavigate(); // ✅ Hook navigate

  useEffect(() => {
  axios.get("http://localhost:3001/laporan")
    .then(res => {
      // Sort agar yang status selesai di bawah
      const sortedData = res.data.sort((a, b) => {
        if (a.status === 'selesai' && b.status !== 'selesai') return 1;
        if (a.status !== 'selesai' && b.status === 'selesai') return -1;
        return 0;
      });
      setLaporan(sortedData);
    })
    .catch(err => console.error(err));
}, []);

  const handleStatusChange = async (id, status) => {
    try {
      console.log('Update status:', id, status); // Cek data
      const response = await axios.post(`http://localhost:3001/laporan/${id}/status`, { status });
      console.log('Response:', response.data);
      
      const res = await axios.get("http://localhost:3001/laporan");
      setLaporan(res.data);
    } catch (err) {
      console.error(err);
    }
    const res = await axios.get("http://localhost:3001/laporan");
    const sortedData = res.data.sort((a, b) => {
      if (a.status === 'selesai' && b.status !== 'selesai') return 1;
      if (a.status !== 'selesai' && b.status === 'selesai') return -1;
      return 0;
    });
    setLaporan(sortedData);
  };

  const handleDelete = async (id, judul) => {
    // Konfirmasi delete
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus laporan "${judul}"?`);
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/laporan/${id}`);
        
        // Refresh data setelah delete
        const res = await axios.get("http://localhost:3001/laporan");
        const sortedData = res.data.sort((a, b) => {
          if (a.status === 'selesai' && b.status !== 'selesai') return 1;
          if (a.status !== 'selesai' && b.status === 'selesai') return -1;
          return 0;
        });
        setLaporan(sortedData);
        
        alert('Laporan berhasil dihapus!');
      } catch (err) {
        console.error('Error deleting laporan:', err);
        alert('Gagal menghapus laporan. Silakan coba lagi.');
      }
    }
  };

  const handlePrint = (id) => {
    navigate(`/LaporanDetail/${id}`); 
  };

  return (
    <div className="d-flex">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={LogoLight} alt="logo"/>
          <div className="sidebar-title">Admin Panel</div>
          <div className="sidebar-subtitle">Dashboard</div>
        </div>
        
        <nav className="sidebar-nav">
          <a href="./admin-dashboard">
            <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </a>

            <Link to="/laporan_list" className="active">
            <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
            </svg>
            Daftar Laporan
            </Link>
        </nav>
        
        <div className="sidebar-logout">
          <a href="./admin">
            <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </a>
        </div>
      </div>

      <div className="content">
        <h2 className="mb-4 text-center" style={{ color: "#1e3a59" }}>Daftar Laporan</h2>

        <div className="table-responsive">
          <table className="table table-bordered table-striped custom-headers">
            <thead className="custom-headers">
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Tanggal</th>
                <th className="text-center">Judul</th>
                <th className="text-center">Kategori</th>
                <th className="text-center">Status Kasus</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {laporan.map((row, index) => (
                <tr key={row.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">
                    {new Date(row.tanggal).toLocaleDateString('id-ID', {
                      timeZone: 'Asia/Jakarta',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="text-center">{row.judul}</td>
                  <td className="text-center">{row.kategori}</td>
                  <td className="text-center">
                    <select
                      className="custom-select"
                      value={row.status}
                      onChange={(e) => handleStatusChange(row.id, e.target.value)}
                      disabled={row.status === 'selesai'}
                    >
                      <option value="dikaji">Dikaji</option>
                      <option value="diselidiki">Diselidiki</option>
                      <option value="selesai">Selesai</option>
                    </select>
                  </td>
                  <td className="text-center">
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button type="button" className="print-button" onClick={() => handlePrint(row.id)}>
                        <svg style={{width: '16px', height: '16px', marginRight: '8px'}} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7.828A2 2 0 0017.414 7L13 2.586A2 2 0 0011.586 2H4zm9 1.414L16.586 7H13a1 1 0 01-1-1V3.414z" />
                        </svg> Detail
                      </button>
                      
                      <button 
                        type="button" 
                        className="delete-button" 
                        onClick={() => handleDelete(row.id, row.judul)}
                        style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '30px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                      >
                        <svg style={{width: '16px', height: '16px', marginRight: '8px'}} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LaporanList;
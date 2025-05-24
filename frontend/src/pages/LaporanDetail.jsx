import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import '../assets/css/LaporanDetail.css';

const LaporanDetail = () => {
  const { id } = useParams();
  const [laporan, setLaporan]= useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/laporan/${id}`); // ganti URL jika beda
        setLaporan(res.data);
      } catch (err) {
        setError("Gagal mengambil data laporan");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLaporan();
  }, [id]);


  // Fungsi download gambar
  const handleDownloadGambar = () => {
    const link = document.createElement("a");
    link.href = laporan.gambarUrl;
    link.download = `gambar_laporan_${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fungsi cetak laporan (print window)
  const handleCetak = () => {
    window.print();
  };

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Fungsi untuk menentukan kelas status
  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'dikaji':
        return 'status-dikaji';
      case 'selesai':
        return 'status-selesai';
      case 'proses':
        return 'status-proses';
      default:
        return 'status-dikaji';
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!laporan) return <div>Data laporan tidak ditemukan</div>;
    return (
    <div className="container">
      {/* Header Section */}
      <div className="header-section">
        <h2>Detail Laporan</h2>
        <div className="report-id">ID: {laporan.id }</div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {/* Status Badge */}
        <div className="status-container">
          <div className={`status-badge ${getStatusClass(laporan.status)}`}>
            <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Status: {laporan.status}
          </div>
        </div>

        {/* Details Grid */}
        <div className="details-grid">
          <div className="detail-card">
            <div className="label">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Tanggal Laporan
            </div>
            <div className="value">{formatDate(laporan.tanggal)}</div>
          </div>

          <div className="detail-card">
            <div className="label">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Kategori
            </div>
            <div className="value">{laporan.kategori}</div>
          </div>

          <div className="detail-card">
            <div className="label">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Pelapor
            </div>
            <div className="value">{laporan.nama ?? '-'}</div>
          </div>

          <div className="detail-card">
            <div className="label">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
              </svg>
              Judul Laporan
            </div>
            <div className="value">{laporan.judul}</div>
          </div>
        </div>

        {/* Content Card */}
        <div className="content-card">
          <div className="label">
            <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Isi Laporan
          </div>
          <div className="value">{laporan.isi}</div>
        </div>

        {/* Image Card */}
        <div className="image-card">
          <div className="label">
            <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            Gambar Laporan
          </div>
          <img 
            src={laporan.gambarUrl} 
            alt="Gambar Laporan" 
            className="image-preview"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0E0QUYiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTM1IDVINUMzLjM0IDUgMiA2LjM0IDIgOFYzMkMyIDMzLjY2IDMuMzQgMzUgNSAzNUgzNUMzNi42NiAzNSAzOCAzMy42NiAzOCAzMlY4QzM4IDYuMzQgMzYuNjYgNSAzNSA1Wk0xNCAyM0wxOCAyOEwyNSAyMUwyMyAxOUwyMiAyMC41TDE5IDIzTDE0IDIzWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4KPC9zdmc+';
            }}
          />
        </div>

        {/* Button Group */}
        <div className="button-group">
          <button className="button" onClick={handleDownloadGambar}>
            <svg style={{width: '16px', height: '16px', marginRight: '8px'}} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Gambar
          </button>
          <button className="button" onClick={handleCetak}>
            <svg style={{width: '16px', height: '16px', marginRight: '8px'}} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            Cetak Laporan
          </button>
        </div>

        {/* Back Link */}
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Link to="/laporan_list" className="back-link">
            <svg style={{width: '16px', height: '16px'}} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Kembali ke Daftar Laporan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaporanDetail;
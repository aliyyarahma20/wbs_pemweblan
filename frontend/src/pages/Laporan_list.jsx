import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/laporan_list.css"; // Import CSS file

const LaporanList = () => {
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    // Ambil data laporan dari backend
    axios.get("http://localhost:3001/laporan")
      .then(res => setLaporan(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.post(`http://localhost:3001/api/laporan/${id}/status`, { status });
      // Refresh data
      const res = await axios.get("http://localhost:3001/api/laporan");
      setLaporan(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrint = (id) => {
    window.open(`http://localhost:3001/api/laporan/${id}/print`, '_blank');
  };

  return (
    <div className="d-flex">
      <div className="sidebar">
        <img src="/images/logo-admin.png" alt="Logo" className="sidebar-logo" />
        <a href="/admin-dashboard">Dashboard</a>
        <a href="/laporan_list" className="active">Daftar Laporan</a>
        <a href="/login">Logout</a>
      </div>

      <div className="content">
        <h2 className="mb-4 text-center" style={{ color: "#1e3a59" }}>Daftar Laporan</h2>

        <div className="table-responsive">
          <table className="table table-bordered table-striped custom-headers">
            <thead className="custom-headers">
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Tanggal</th>
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
                  <td className="text-center">{row.kategori}</td>
                  <td className="text-center">
                    <select
                      className="custom-select"
                      value={row.status}
                      onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    >
                      <option value="dikaji">Dikaji</option>
                      <option value="diselidiki">Diselidiki</option>
                      <option value="selesai">Selesai</option>
                    </select>
                  </td>
                  <td className="text-center">
                    <button className="print-button" onClick={() => handlePrint(row.id)}>
                      <i className="fas fa-print"></i> Print
                    </button>
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

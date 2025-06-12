// src/pages/DashboardUser.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/DashboardUser.css";   // sesuaikan nama file
import { useNavigate } from "react-router-dom";

const DashboardUser = () => {
  const [laporan, setLaporan] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/laporan")
      .then(res => setLaporan(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleTambah = () => {
    navigate("/user");
  };

  return (
    <div className="dashboard-user">
      <h2 className="dashboard-title">Laporan Anda</h2>

      <button className="btn-tambah" onClick={handleTambah}>
        + Tambah Laporan
      </button>

      <div className="table-container">
        <table className="laporan-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tanggal</th>
              <th>Judul</th>
              <th>Kategori</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {laporan.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                <td>{item.judul}</td>
                <td>{item.kategori}</td>
                <td className={`status ${item.status}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardUser;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import User from './pages/User';
import LaporanList from './pages/Laporan_list'; // ✅ import baru
import LaporanDetail from './pages/LaporanDetail';  // ✅ Detail laporan (baru kamu buat)


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/laporan_list" element={<LaporanList />} /> {/* ✅ route baru */}
        <Route path="/LaporanDetail/:id" element={<LaporanDetail />} /> {/* ✅ Route baru */}
        <Route path="/" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;

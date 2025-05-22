import React, { useState } from 'react';
import '../assets/css/LoginAdmin.css';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      alert('Login berhasil!');
      window.location.href = '/admin-dashboard'; // ← navigasi manual
    } else {
      setError(data.message);
    }
  };

  return (
    <div>
      <h2>LOGIN ADMIN</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input type="text" name="username" onChange={handleChange} required />
        <br />
        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} required />
        <br />
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default AdminLogin;

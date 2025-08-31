// frontend/src/pages/AdminLoginPage.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Call the admin-specific endpoint
      const { data } = await api.post('/auth/login/admin', { email, password });
      login(data); // The same context function handles the logic
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log in as admin');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login as Admin</button>
    </form>
  );
};

export default AdminLoginPage;
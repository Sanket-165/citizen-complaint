// frontend/src/pages/CitizenLoginPage.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api'; // We'll call the API directly here for clarity
import { useNavigate } from 'react-router-dom';

const CitizenLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // We get the login function from context to update the global state
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Call the citizen-specific endpoint
      const { data } = await api.post('/auth/login/citizen', { email, password });
      login(data); // This function from context will set user state and redirect
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Citizen Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default CitizenLoginPage;
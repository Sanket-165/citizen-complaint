import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
      if (user.role === 'admin') {
          navigate('/admin-dashboard');
      } else {
          navigate('/citizen-dashboard');
      }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">CivicReporter</Link>
      <nav>
        {user ? (
          <>
            <span>Welcome, {user.name}!</span>
            <button onClick={handleDashboardClick} style={{ margin: '0 10px' }}>Dashboard</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login/citizen">Citizen Login</Link>
            <Link to="/login/admin">Admin Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
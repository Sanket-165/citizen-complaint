import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import CitizenLoginPage from './pages/CitizenLoginPage.jsx'; // ✨ NEW
import AdminLoginPage from './pages/AdminLoginPage.jsx'; 
import RegisterPage from './pages/RegisterPage.jsx';
import CitizenDashboard from './components/CitizenDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* REMOVE the old /login route */}
          <Route path="/login/citizen" element={<CitizenLoginPage />} /> {/* ✨ NEW */}
          <Route path="/login/admin" element={<AdminLoginPage />} />   {/* ✨ NEW */}
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes remain the same */}
          <Route path="/citizen-dashboard" element={<PrivateRoute component={CitizenDashboard} role="citizen" />} />
          <Route path="/admin-dashboard" element={<PrivateRoute component={AdminDashboard} role="admin" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
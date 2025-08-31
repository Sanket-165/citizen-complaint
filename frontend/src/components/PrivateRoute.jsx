import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // Redirect to home or citizen dash if admin tries citizen route and vice versa
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default PrivateRoute;
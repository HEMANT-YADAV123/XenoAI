import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('authToken'); // Check for the token in localStorage

  return token ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!token || user?.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;

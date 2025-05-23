import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    // ✅ Always save pathname and state explicitly
    localStorage.setItem(
      'redirectAfterLogin',
      JSON.stringify({
        pathname: location.pathname,
        state: location.state || null,
      })
    );
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

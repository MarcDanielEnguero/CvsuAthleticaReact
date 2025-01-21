// src/components/ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Redirect to login while saving the attempted page
    return <Navigate to="/landing" state={{ from: location }} replace />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  // If it's the landing page, allow access regardless of login status
  if (location.pathname === '/landing') {
    return children;
  }
  
  // For other public routes (like login), redirect if already logged in
  if (token && location.pathname === '/') {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token) {
    return <Navigate to="/landing" replace />;
  }

  if (userRole !== 'admin') {
    return <Navigate to="/mainCampusInfoIndex" replace />;
  }

  return children;
};
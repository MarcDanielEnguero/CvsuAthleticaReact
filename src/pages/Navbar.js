import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logonav from '../assets/img/logonav.png';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    // Check initially
    checkAuthStatus();

    // Add event listener for storage changes
    window.addEventListener('storage', checkAuthStatus);

    // Check auth status on route changes
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      clearInterval(interval);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    // Clear token
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/landing');
  };

  return (
    <nav className="navbar">
      <div className="logonav">
        <img src={logonav} alt="Logo" />
      </div>

      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input type="text" id="searchInput" placeholder="Search" />
      </div>

      <ul className="nav-links">
        <li><Link to="/landing">HOME</Link></li>
        <li><Link to="/aboutUs">ABOUT</Link></li>
        <li><Link to="/free-training-form">TRYOUTS</Link></li>
        <li><Link to="/events">EVENTS</Link></li>
        <li><Link to="/campusIndex">COLLEGES</Link></li>
        <li><Link to="/contactUs">CONTACT US</Link></li>
      </ul>

      {/* Notifications (Only if logged in) */}
      {isAuthenticated && (
        <div className="notifications">
          <i className="fas fa-bell"></i>
        </div>
      )}

      {/* Profile and Login/Logout Button */}
      <div className="profile">
        {isAuthenticated ? (
          <Link to="#" onClick={handleLogout} className="nav-button">
            LOGOUT
          </Link>
        ) : (
          <Link to="/login" className="nav-button">
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
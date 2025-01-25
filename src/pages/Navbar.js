import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logonav from '../assets/img/logonav.png';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      setIsAuthenticated(!!token);
      if (token) {
        setUserEmail(email || ""); // Optional: Fetch or use stored email.
      }
    };

    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);

    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      clearInterval(interval);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsAuthenticated(false);
    setUserEmail("");
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
        <li><Link to="/tryouts-training-student">TRYOUTS/TRAINING</Link></li>
        <li><Link to="/events">EVENTS</Link></li>
        <li><Link to="/campusIndex">COLLEGES</Link></li>
        <li><Link to="/contactUs">CONTACT US</Link></li>
      </ul>

      {isAuthenticated && (
        <>
          {/* Notifications */}
          <div className="notifications">
            <i className="fas fa-bell"></i>
            <div className="notifications-badge">3</div>
          </div>

          {/* Profile */}
          <div className="profile">
                  <span className="user-email">{userEmail}</span>
                  <Link to="/profile">
                      <i className="fas fa-user-circle"></i>
                  </Link>
              <Link to="#" onClick={handleLogout} className="nav-button">
                LOGOUT
              </Link>
          </div>
        </>
      )}

      {!isAuthenticated && (
        <div className="profile">
          <Link to="/login" className="nav-button">
            LOGIN
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
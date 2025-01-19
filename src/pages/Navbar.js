import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import ContactUs from '../pages/ContactUs';
import AboutUs from '../pages/AboutUs';
import CampusIndex from '../pages/CampusIndex';
import logonav from '../assets/img/logonav.png';

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

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
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/aboutUs">ABOUT</Link></li>
        <li><Link to="/free-training-form">TRYOUTS</Link></li>
        <li><Link to="/events">EVENTS</Link></li>
        <li><Link to="/campusIndex">COLLEGES</Link></li>
        <li><Link to="/contactUs">CONTACT US</Link></li>
        {!isLoggedIn && <li><Link to="/login">LOGIN</Link></li>}
      </ul>
      {isLoggedIn && (
        <div className="notifications">
          <i className="fas fa-bell"></i>
        </div>
      )}

      <div className="profile">
        {isLoggedIn && <button>Profile</button>}
      </div>
    </nav>
  );
};

export default Navbar;
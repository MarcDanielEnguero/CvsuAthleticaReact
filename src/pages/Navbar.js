import React from 'react';
import './Navbar.css';
import logonav from '../assets/img/logonav.png';

const Navbar = () => {
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
            <li><a href="index.html">HOME</a></li>
            <li><a href="#">ABOUT</a></li>
            <li><a href="#">TRYOUTS</a></li>
            <li><a href="#">EVENTS</a></li>
            <li><a href="#">COLLEGES</a></li>
            <li><a href="#">CONTACT US</a></li>
            <li><a href="login.html">LOGIN</a></li>
        </ul>
        <div className="notifications">
            <i className="fas fa-bell"></i>
        </div>

        <div className="profile">
        {/* Add content for profile div if needed */}
        </div>
    </nav>
  );
};

export default Navbar;

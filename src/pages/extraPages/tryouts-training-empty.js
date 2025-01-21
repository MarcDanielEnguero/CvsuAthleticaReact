import React from 'react';
import './style.css'; // Importing styles
import './tryouts-training.css';
import './tryouts-training-empty.css';

const TryoutsTraining = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <img src="./pics/logo.png" alt="Logo" />
        </div>
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" id="searchInput" placeholder="Search" />
        </div>
        <ul className="nav-links">
          <li><a href="/">HOME</a></li>
          <li><a href="#">ABOUT</a></li>
          <li><a href="#">TRYOUTS/TRAINING</a></li>
          <li><a href="#">EVENTS</a></li>
          <li><a href="#">COLLEGES</a></li>
          <li><a href="#">CONTACT US</a></li>
          <li><a href="/login">LOGIN</a></li>
        </ul>
        <div className="notifications">
          <i className="fas fa-bell"></i>
        </div>
        <div className="profile">
          <a href="/profile"><i className="fas fa-user-circle"></i></a>
        </div>
      </nav>

      {/* Main Content */}
      <section className="main-contents">
        <h1>TRYOUTS/TRAINING</h1>
      </section>

      {/* Empty Content */}
      <section className="empty-content">
        <h3>Hmmm... It seems empty around here</h3>
        <div className="tumbleweed-icon">
          <i className="fas fa-wind"></i>
        </div>
      </section>

      {/* Footer with Email Contacts */}
      <div className="footer-bar">
        <div className="email-contact">
          <i className="fa fa-envelope"></i> email1@periodt.com
        </div>
        <div className="email-contact">
          <i className="fa fa-envelope"></i> email2@periodt.com
        </div>
      </div>
    </div>
  );
};

export default TryoutsTraining;

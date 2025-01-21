import React from 'react';
import "./style.css"; // Existing styles
import './admin-profile.css'; // Import your CSS file

function AdminProfile() {
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

      {/* Profile Container */}
      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-content">
          <div className="profile-icon">
            <i className="fas fa-user-circle fa-10x"></i>
            <p><a href="#">Upload Photo</a></p>
            <h2>ADMIN</h2>
            <button className="change-password-btn">Change Password</button>
          </div>
          <div className="profile-details">
            <form>
              <div className="cvsu-athletica">
                <h2>CvSU Athletica</h2>
              </div>

              <table>
                <tr>
                  <td>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" />
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className="account-management-title">
        <h2>ACCOUNT MANAGEMENT</h2>
      </div>

      <div className="account-management-container">
        {/* Additional content */}
      </div>

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
}

export default AdminProfile;

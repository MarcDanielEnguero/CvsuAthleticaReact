import React, { useState, useEffect } from 'react';
import './confirmation-code.css'; // Import your CSS for this page
import "./style.css"; // Existing styles

function ConfirmationCode() {
  const [verificationCode, setVerificationCode] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Validate input whenever the verificationCode changes
  const validateCode = (code) => {
    const isValidCode = /^\d{4}$/.test(code); // Ensure it's a 4-digit number
    setIsButtonDisabled(!isValidCode); // Enable/disable button based on validity
  };

  // Update the verificationCode and validate on input
  const handleInputChange = (e) => {
    const code = e.target.value;
    setVerificationCode(code);
    validateCode(code);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/new-password'; // Redirect to the new password page after submission
  };

  // Effect hook to handle validation once the component is mounted
  useEffect(() => {
    validateCode(verificationCode); // Initial validation check when the component loads
  }, [verificationCode]);

  return (
    <div>
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
          <li><a href="#">TRYOUTS/TRANING</a></li>
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

      <div className="forget-password-container">
        <div className="forget-password-box">
          <div className="forgot-title">
            <h2>Email Verification</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="verificationCode" className="forgotemail">Enter Code</label>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                placeholder="1234"
                pattern="\d{4}"
                required
                value={verificationCode}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="reset" id="resetButton" disabled={isButtonDisabled}>Verify Code</button>
          </form>
        </div>
      </div>

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

export default ConfirmationCode;

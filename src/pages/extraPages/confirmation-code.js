import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar'; // Import Navbar component
import styles from './coach-profile.module.css'; // Import scoped CSS module

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
    <div className={styles.body}>
      <Navbar /> {/* Using the imported Navbar component */}
      
      <div className={styles.forgetPasswordContainer}>
        <div className={styles.forgetPasswordBox}>
          <div className={styles.forgotTitle}>
            <h2>Email Verification</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="verificationCode" className={styles.forgotEmail}>Enter Code</label>
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
            <button type="submit" className={styles.reset} id="resetButton" disabled={isButtonDisabled}>Verify Code</button>
          </form>
        </div>
      </div>

      <div className={styles.footerBar}>
        <div className={styles.emailContact}>
          <i className="fa fa-envelope"></i> email1@periodt.com
        </div>
        <div className={styles.emailContact}>
          <i className="fa fa-envelope"></i> email2@periodt.com
        </div>
      </div>
    </div>
  );
}

export default ConfirmationCode;

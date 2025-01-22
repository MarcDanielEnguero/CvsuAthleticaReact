import React, { useState } from 'react';
import styles from './forget-password.module.css'; // Import the CSS module
import Navbar from '../Navbar'; // Import Navbar component

function ForgetPassword() {
  const [email, setEmail] = useState(''); // State to store the email input
  const [isEmailValid, setIsEmailValid] = useState(false); // State to track email validation

  // Handle email input changes
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value); // Update the email state
    setIsEmailValid(value.trim() !== ''); // Check if email is not empty
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid) {
      // Redirect or handle logic after valid email input
      window.location.href = "/confirmation-code"; // Example redirection to confirmation page
    }
  };

  return (
    <div className={styles.forgetPasswordWrapper}> {/* Apply the wrapper class here */}
      <Navbar /> {/* Render the Navbar component here */}
      <div className={styles.forgetPasswordContainer}>
        <div className={styles.forgetPasswordBox}>
          <div className={styles.forgotTitle}>
            <h2>Forgot Password</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.forgotEmail}>Enter Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={handleEmailChange} // Update state on input change
                required
                className={styles.emailInput} // Use the email class for styling
              />
            </div>
            <button
              type="submit"
              className={styles.reset}
              id="resetButton"
              disabled={!isEmailValid} // Disable button if email is empty
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;

import React, { useState } from 'react';
import './forget-password.css'; // Import the corresponding CSS file for styling
import "./style.css"; // Existing styles

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
    <div className="forget-password-container">
      <div className="forget-password-box">
        <div className="forgot-title">
          <h2>Forgot Password</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="forgotemail">Enter Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={handleEmailChange} // Update state on input change
              required
            />
          </div>
          <button
            type="submit"
            className="reset"
            id="resetButton"
            disabled={!isEmailValid} // Disable button if email is empty
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;

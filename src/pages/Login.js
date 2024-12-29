import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/img/logo.png';
import Navbar from './Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data.token);
        // Store token and redirect user
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="background-container">
        <div className="login-container">
          <img src={logo} alt="CvSU Athletica" className="logo" />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-links">
              <a href="/forgot-password">Forget Password</a>
            </div>
            <button type="submit" className="login-btn">Login</button>
            <div className="or-container">Or</div>
            <button type="button" className="google-btn">
              <FontAwesomeIcon icon={faGoogle} className="google-icon" />
              Login with CvSU Email
            </button>
          </form>
        </div>
        <footer>
          <p>csgmain@cvsu.edu.ph | cvsu.cspear.sc@cvsu.edu.ph</p>
        </footer>
      </div>
    </>
  );
};

export default Login;

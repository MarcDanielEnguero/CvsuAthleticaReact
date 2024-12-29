import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/img/logo.png';
import Navbar from './Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
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

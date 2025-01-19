import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';
import logo from '../assets/img/logo.png';
import googleIcon from '../assets/img/google-icon.png';
import Navbar from './Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`;
      const response = await axios.post(apiUrl, {
        email,
        password,
      });
      
      localStorage.setItem('token', response.data.token);
      setError('');
      navigate('/landing');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login functionality
    console.log('Google login clicked');
  };

  return (
    <>
      <Navbar />
      <div className={styles.loginBackgroundContainer}>
        <div className={styles.loginContainer}>
          <img src={logo} alt="CvSU Athletica" className={styles.logo} />
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.forgotPassword}>
              <a href="/forgot-password">Forgot Password</a>
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <button type="submit" className={styles.loginBtn}>
              Login
            </button>
          </form>
          
          <div className={styles.orDivider}>
            <span>Or With</span>
          </div>

          <button onClick={handleGoogleLogin} className={styles.googleBtn}>
            <img src={googleIcon} alt="Google" />
            Login with CvSU Email
          </button>
        </div>
        
        <div className={styles.loginFooter}>
          <p>csgmain@cvsu.edu.ph | cvsu.cspear.sc@cvsu.edu.ph</p>
        </div>
      </div>
    </>
  );
};

export default Login;

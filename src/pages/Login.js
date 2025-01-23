import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';
import logo from '../assets/img/logo.png';

const Login = () => {
  const { login, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGoogleSignIn = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleClient;
      script.onerror = () => setError('Failed to load Google Sign-In');
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    };

    loadGoogleSignIn();
  }, []);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    timeout: 10000 // 10 seconds
  });
  

  const initializeGoogleClient = () => {
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { 
          theme: 'outline', 
          size: 'large', 
          text: 'continue_with' 
        }
      );
    } catch (err) {
      console.error('Error initializing Google Sign-In:', err);
      setError('Failed to initialize Google Sign-In');
    }
  };

  const handleGoogleSignIn = async (response) => {
    if (response.credential) {
      try {
        setLoading(true);
        const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/google`;
        const backendResponse = await axios.post(apiUrl, {
          credential: response.credential,
        });

        if (backendResponse.data.token) {
          login(backendResponse.data.token, backendResponse.data.user);
          localStorage.setItem('token', backendResponse.data.token);
          localStorage.setItem('user', JSON.stringify(backendResponse.data.user));
          setError('');
          navigate('/landing');
        }
      } catch (err) {
        console.error('Google login error:', err);
        setError(err.response?.data?.error || 'Google login failed');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`;
      const response = await axios.post(apiUrl, {
        email,
        password
      });
  
      if (response.data.token) {
        login(response.data.token, response.data.user);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/landing');
      }
    } catch (err) {
      console.error('Full error:', err);
      console.error('Error response:', err.response);
      
      // More detailed error logging
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Data:', err.response.data);
        console.error('Status:', err.response.status);
        console.error('Headers:', err.response.headers);
        
        setError(err.response.data?.message || 'Server error');
      } else if (err.request) {
        // The request was made but no response was received
        console.error('Request:', err.request);
        setError('No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', err.message);
        setError('Error setting up request');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginBackgroundContainer}>
      <div className={styles.loginContainer}>
        <img src={logo} alt="CvSU Athletica" className={styles.logo} />
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button 
            type="submit" 
            className={styles.loginBtn}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className={styles.orDivider}>
            <span>Or With</span>
          </div>
          <div 
            id="google-signin-button" 
            className={styles.googleBtn}
          />
          {(error || authError) && (
            <p className={styles.errorMessage}>{error || authError}</p>
          )}
        </form>
        <div className={styles.loginFooter}>
          <p>© 2024 CvSU Athletica</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
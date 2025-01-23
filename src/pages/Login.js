import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';
import logo from '../assets/img/logo.png';
import Navbar from './Navbar';

const Login = () => {
  const { login, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleClient;
      script.onerror = () => setError('Failed to load Google Sign-In');
      document.head.appendChild(script);
    };

    if (!window.google) {
      loadGoogleScript();
    } else {
      initializeGoogleClient();
    }

    return () => {
      window.google?.accounts?.id?.cancel();
    };
  }, []);

  const handleCredentialResponse = async (response) => {
    if (response.credential) {
      try {
        setLoading(true);
        const apiUrl = 'http://localhost:5000/api/auth/google';
        const backendResponse = await axios.post(apiUrl, {
          credential: response.credential,
        });

        if (backendResponse.data.token) {
          localStorage.setItem('token', backendResponse.data.token);
          localStorage.setItem('user', JSON.stringify(backendResponse.data.user));
          setError('');
          navigate('/landing');
        }
      } catch (err) {
        console.error('Google login error:', err);
        setError('Login failed. Please ensure you are using a valid CvSU email.');
      } finally {
        setLoading(false);
      }
    }
  };

  const initializeGoogleClient = () => {
    if (!window.google?.accounts?.id) {
      setTimeout(initializeGoogleClient, 100);
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        hosted_domain: 'cvsu.edu.ph',
        cancel_on_tap_outside: true,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
        }
      );
    } catch (err) {
      console.error('Error initializing Google Sign-In:', err);
      setError('Failed to initialize Google Sign-In');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('Attempting login to:', 'http://localhost:5000/api/auth/login');
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/landing');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
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
                placeholder="example@cvsu.edu.ph"
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
            <button
              type="submit"
              className={styles.loginBtn}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

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
        </div>

        <div className={styles.loginFooter}>
          <p>csgmain@cvsu.edu.ph | cvsu.cspear.sc@cvsu.edu.ph</p>
        </div>
      </div>
    </>
  );
};

export default Login;
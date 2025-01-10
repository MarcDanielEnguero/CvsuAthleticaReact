import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from '../assets/img/logo.png';
import Navbar from './Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`; // Fallback to localhost
      console.log('API URL:', apiUrl);
  
      const response = await axios.post(apiUrl, {
        email,
        password,
      });
  
      console.log('Backend response:', response.data);
  
      localStorage.setItem('token', response.data.token);
  
      setError('');
      alert('Login successful!');
      navigate('/landing'); // Redirect to Landing.js
    } catch (err) {
      console.error('Error details:', err.response || err.message);
      if (err.response) {
        console.log('Status:', err.response.status);
        console.log('Data:', err.response.data);
      }
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="background-container">
        <div className="login-container">
          <img src={logo} alt="CvSU Athletica" className="logo" />
          <form onSubmit={handleLogin}>
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
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-btn">Login</button>
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
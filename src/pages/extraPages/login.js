import React, { useState } from 'react';
import './login.css';
import "./style.css"; // Existing styles

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Basic validation
        if (email === '' || password === '') {
            alert('Please fill in both email and password.');
            return;
        }

        // Simulate successful login (you can replace this with actual logic)
        alert('Login successful! Redirecting...');
        
        // Redirect to home page or dashboard
        window.location.href = 'index.html'; // Replace with your actual redirect URL
    };

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

            <div className="login-container">
                <div className="login-box">
                    <div className="logo">
                        <img src="./pics/bee-logo.png" alt="Logo" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="forgot-password">
                            <a href="/forget-password">Forgot Password?</a>
                        </div>
                        <button type="submit" className="login-btn">Login</button>
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
};

export default Login;

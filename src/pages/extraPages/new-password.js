import React, { useState, useEffect } from 'react';
import './new-password.css';
import "./style.css"; // Existing styles

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isResetComplete, setIsResetComplete] = useState(false);

    useEffect(() => {
        // Function to check if passwords match
        const checkPasswordsMatch = () => {
            if (newPassword && reenterPassword && newPassword === reenterPassword) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        };

        checkPasswordsMatch();
    }, [newPassword, reenterPassword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate a successful reset and show completion message
        setIsResetComplete(true);
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

            {!isResetComplete ? (
                <div className="forget-password-container">
                    <div className="forget-password-box">
                        <div className="forgot-title">
                            <h2>Reset Password</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="newPassword" className="forgotemail">Enter New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reenterPassword" className="forgotemail">Re-enter New Password</label>
                                <input
                                    type="password"
                                    id="reenterPassword"
                                    name="reenterPassword"
                                    placeholder="Re-enter Password"
                                    value={reenterPassword}
                                    onChange={(e) => setReenterPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="reset"
                                id="resetButton"
                                disabled={isButtonDisabled}
                            >
                                Confirm New Password
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="reset-complete-container">
                    <div className="reset-complete-box">
                        <h3>Your Password Has Been Reset Successfully. Log in with new password</h3>
                        <button onClick={() => window.location.href = '/login'} className="proceed-to-login">
                            Proceed to Login
                        </button>
                    </div>
                </div>
            )}

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

export default ResetPassword;

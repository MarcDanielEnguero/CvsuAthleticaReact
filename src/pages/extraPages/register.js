import React, { useState } from 'react';
import './register.css';
import "./style.css"; // Existing styles

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        studentNumber: '',
        phoneNumber: '',
        college: '',
        department: '',
        course: '',
        yearSection: '',
        cvsuEmail: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const checkFormValidity = () => {
        const requiredFields = Object.values(formData);
        const allFilled = requiredFields.every(field => field.trim() !== '');
        setIsFormValid(allFilled);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            // Process the registration data (e.g., send it to an API)
            console.log("Registration Successful", formData);
            alert("Registration Successful!");
            // Redirect to the tryout schedule page
            window.location.href = '/tryout-schedule';
        }
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

            <div className="registration-container">
                <div className="registration-box">
                    <h2>PERSONAL INFORMATION</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="first-name">First Name</label>
                            <input
                                type="text"
                                id="first-name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last-name">Last Name</label>
                            <input
                                type="text"
                                id="last-name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="student-number">Student Number</label>
                            <input
                                type="text"
                                id="student-number"
                                name="studentNumber"
                                value={formData.studentNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone-number">Phone Number</label>
                            <input
                                type="text"
                                id="phone-number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="college">College</label>
                            <select
                                id="college"
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select College</option>
                                <option value="college1">College 1</option>
                                <option value="college2">College 2</option>
                                <option value="college3">College 3</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Department</label>
                            <input
                                type="text"
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="course">Course</label>
                            <input
                                type="text"
                                id="course"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="year-section">Year & Section</label>
                            <input
                                type="text"
                                id="year-section"
                                name="yearSection"
                                value={formData.yearSection}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvsu-email">CvSU Email</label>
                            <input
                                type="email"
                                id="cvsu-email"
                                name="cvsuEmail"
                                value={formData.cvsuEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="registration-btn"
                            id="next-btn"
                            disabled={!isFormValid}
                        >
                            Next
                        </button>
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

export default Registration;

import React, { useState } from 'react';
import './profile.css';
import "./style.css"; // Existing styles

const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [college, setCollege] = useState('');
    const [email, setEmail] = useState('');
    const [year, setYear] = useState('');
    const [course, setCourse] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Profile Updated:", { firstName, lastName, studentId, phoneNo, college, email, year, course });
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

            <div className="profile-container">
                <h1>Profile</h1>
                <div className="profile-content">
                    <div className="profile-icon">
                        <i className="fas fa-user-circle fa-10x"></i>
                        <p><a href="#">Upload Photo</a></p>
                        <h2>STUDENT</h2>
                        <button className="change-password-btn">Change Password</button>
                    </div>
                    <div className="profile-details">
                        <form onSubmit={handleSubmit}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="first-name">First Name</label>
                                            <input
                                                type="text"
                                                id="first-name"
                                                name="first-name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <label htmlFor="last-name">Last Name</label>
                                            <input
                                                type="text"
                                                id="last-name"
                                                name="last-name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="student-id">Student ID</label>
                                            <input
                                                type="text"
                                                id="student-id"
                                                name="student-id"
                                                value={studentId}
                                                onChange={(e) => setStudentId(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <label htmlFor="phone-no">Phone No.</label>
                                            <input
                                                type="text"
                                                id="phone-no"
                                                name="phone-no"
                                                value={phoneNo}
                                                onChange={(e) => setPhoneNo(e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="college">College</label>
                                            <input
                                                type="text"
                                                id="college"
                                                name="college"
                                                value={college}
                                                onChange={(e) => setCollege(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="year">Year & Section</label>
                                            <input
                                                type="text"
                                                id="year"
                                                name="year"
                                                value={year}
                                                onChange={(e) => setYear(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <label htmlFor="course">Course</label>
                                            <input
                                                type="text"
                                                id="course"
                                                name="course"
                                                value={course}
                                                onChange={(e) => setCourse(e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="submit" className="submit-btn">Update Profile</button>
                        </form>
                    </div>
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

export default Profile;

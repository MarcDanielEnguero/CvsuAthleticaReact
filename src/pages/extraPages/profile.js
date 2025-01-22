import React, { useState } from 'react';
import styles from './profile.module.css'; // Import scoped CSS modules
import Navbar from '../Navbar'; // Import Navbar from separate file

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
            {/* Use imported Navbar component */}
            <Navbar />

            <div className={styles.profileContainer}>
                <h1>Profile</h1>
                <div className={styles.profileContent}>
                    <div className={styles.profileIcon}>
                        <i className="fas fa-user-circle fa-10x"></i>
                        <p><a href="#">Upload Photo</a></p>
                        <h2>STUDENT</h2>
                        <button className={styles.changePasswordBtn}>Change Password</button>
                    </div>
                    <div className={styles.profileDetails}>
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
                            <button type="submit" className={styles.submitBtn}>Update Profile</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

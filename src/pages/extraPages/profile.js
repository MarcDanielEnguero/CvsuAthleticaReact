import React, { useState, useEffect } from 'react';
import styles from './profile.module.css'; // Import CSS module
import Navbar from '../Navbar'; // Import Navbar component
import axios from 'axios'; // Axios for API requests

const Profile = () => {
    const [userData, setUserData] = useState({}); // Initialize with empty object to avoid form issues
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isUpdated, setIsUpdated] = useState(false); // Show success message after update

    useEffect(() => {
        // Fetch user profile data
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
                    },
                });
                setUserData(response.data); // Populate user data
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user data. Please try again later.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdated(false); // Reset success message
        try {
            const response = await axios.put('/api/user/profile', userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setIsUpdated(true); // Show success message
            console.log('Profile updated successfully:', response.data);
        } catch (err) {
            console.error('Failed to update profile:', err);
            setError('Failed to update profile. Please try again.');
        }
    };

    return (
        <div>
            <Navbar /> {/* Render Navbar */}

            <div className={styles.profileContainer}>
                <h1>Profile</h1>
                <div className={styles.profileContent}>
                    {error && <p className={styles.errorMessage}>{error}</p>} {/* Display error message */}
                    <div className={styles.profileIcon}>
                        <i className="fas fa-user-circle fa-10x"></i>
                        <p>
                            <a href="#">Upload Photo</a>
                        </p>
                        <h2>STUDENT</h2>
                        <button className={styles.changePasswordBtn}>Change Password</button>
                    </div>
                    <div className={styles.profileDetails}>
                        <form onSubmit={handleSubmit}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="firstName">First Name</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={userData.firstName || ''}
                                                onChange={handleChange}
                                                disabled={loading} // Disable during loading
                                            />
                                        </td>
                                        <td>
                                            <label htmlFor="lastName">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={userData.lastName || ''}
                                                onChange={handleChange}
                                                disabled={loading} // Disable during loading
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="studentId">Student ID</label>
                                            <input
                                                type="text"
                                                id="studentId"
                                                name="studentId"
                                                value={userData.studentId || ''}
                                                onChange={handleChange}
                                                disabled={loading} // Disable during loading
                                            />
                                        </td>
                                        <td>
                                            <label htmlFor="phoneNo">Phone No.</label>
                                            <input
                                                type="text"
                                                id="phoneNo"
                                                name="phoneNo"
                                                value={userData.phoneNo || ''}
                                                onChange={handleChange}
                                                disabled={loading} // Disable during loading
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
                                                value={userData.college || ''}
                                                onChange={handleChange}
                                                disabled={loading} // Disable during loading
                                            />
                                        </td>
                                        <td>
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                value={userData.email || ''}
                                                disabled // Email should not be editable
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
                                                value={userData.year || ''}
                                                onChange={handleChange}
                                                disabled={loading} // Disable during loading
                                            />
                                        </td>
                                        <td>
                                            <label htmlFor="course">Course</label>
                                            <input
                                                type="text"
                                                id="course"
                                                name="course"
                                                value={userData.course || ''}
                                                onChange={handleChange}
                                                disabled={loading} // Disable during loading
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                            {isUpdated && <p className={styles.successMessage}>Profile updated successfully!</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

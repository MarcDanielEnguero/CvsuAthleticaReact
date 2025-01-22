import React, { useState, useEffect } from 'react';
import Navbar from '../pages/Navbar';  // Assuming Navbar is in src/pages
import styles from './register.module.css';  // Import register.module.css for styles

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

    useEffect(() => {
        checkFormValidity();
    }, [formData]);

    return (
        <div>
            <Navbar /> {/* Import and use Navbar component */}

            <div className={styles.registrationContainer}>
                <div className={styles.registrationBox}>
                    <h2>PERSONAL INFORMATION</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
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
                        <div className={styles.formGroup}>
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
                        <div className={styles.formGroup}>
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
                        <div className={styles.formGroup}>
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
                        <div className={styles.formGroup}>
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
                        <div className={styles.formGroup}>
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
                        <div className={styles.formGroup}>
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
                        <div className={styles.formGroup}>
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
                        <div className={styles.formGroup}>
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
                            className={styles.registrationBtn}
                            id="next-btn"
                            disabled={!isFormValid}
                        >
                            Next
                        </button>
                    </form>
                </div>
            </div>

            <div className={styles.footerBar}>
                <div className={styles.emailContact}>
                    <i className="fa fa-envelope"></i> email1@periodt.com
                </div>
                <div className={styles.emailContact}>
                    <i className="fa fa-envelope"></i> email2@periodt.com
                </div>
            </div>
        </div>
    );
};

export default Registration;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TrainingContext from './TrainingContext';
import styles from './FreeTrainingForm.module.css'; // Import the CSS module

const FreeTrainingForm = () => {
  const { setFormData } = useContext(TrainingContext); // Access context
  const navigate = useNavigate();

  const [formData, setLocalFormData] = useState({
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
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({ ...formData, [name]: value });

    // Check if all fields are filled out
    const allFieldsFilled = Object.values({ ...formData, [name]: value }).every(
      (field) => field.trim() !== ''
    );
    setIsFormValid(allFieldsFilled);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, type: 'free-training' }); // Add type field when submitting form

    try {
      // Send the form data to the backend using axios
      const response = await axios.post('http://localhost:5000/api/free-training', formData);

      // Handle response
      console.log('Form submitted successfully:', response.data);
      setMessage(response.data.message); // Display success message
      navigate('/coaches'); // Redirect to coach selection page
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Failed to submit form. Please try again.');
    }
  };

  return (
    <>
      <div className={styles.registrationContainer}>
        <div className={styles.registrationBox}>
          <h2>FREE-TRAINING FORM</h2>
          {message && <p className={styles.message}>{message}</p>}
          <form onSubmit={handleSubmit} className={styles.registrationForm}>
            <div className={styles.formGroup}>
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="college">College</label>
              <select
                id="college"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a college</option>
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className={styles.registrationBtn} disabled={!isFormValid}>
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FreeTrainingForm;

import React, { useState, useContext } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import TrainingContext from './TrainingContext';
import './FreeTrainingForm.css';

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

    const allFieldsFilled = Object.values({ ...formData, [name]: value }).every(
      (field) => field.trim() !== ''
    );
    setIsFormValid(allFieldsFilled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(formData); // Save form data to context
    navigate('/coaches'); // Redirect to FtCoaches
  };

  return (
    <>
      <Navbar />
      <div className="registration-container">
        <div className="registration-box">
          <h2>FREE-TRAINING FORM</h2>
          {message && <p className="message">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
            <button type="submit" className="registration-btn" disabled={!isFormValid}>
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FreeTrainingForm;

import React, { useState } from 'react';
import './ft-coaches-admin.css'; // Make sure to import your existing styles
import "./style.css"; // Existing styles

function FreeTrainingAdmin() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [schedule, setSchedule] = useState([
    ['Coach 1', '9 AM - 12 PM', 'Off', '9 AM - 12 PM', 'Off', '9 AM - 12 PM'],
    ['Coach 2', '10 AM - 1 PM', 'Off', '10 AM - 1 PM', 'Off', '10 AM - 1 PM'],
    ['Coach 3', 'Off', '8 AM - 11 AM', 'Off', '8 AM - 11 AM', 'Off'],
    ['Coach 4', 'Off', '9 AM - 12 PM', 'Off', '9 AM - 12 PM', 'Off'],
  ]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveChanges = () => {
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleChange = (rowIndex, colIndex, value) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[rowIndex][colIndex] = value;
    setSchedule(updatedSchedule);
  };

  return (
    <div className="free-training-admin">
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

      <section className="coach-section">
        <div className="registration-box">
          <div className="form-title">
            <h2>FREE-TRAINING FORM</h2>
          </div>

          <div className="form-content">
            <div className="coach-selection-box">
              <label htmlFor="coachSelect" className="select-coach-title">Select Coach:</label>
              <select id="coachSelect">
                <option value="coach1">Coach 1</option>
                <option value="coach2">Coach 2</option>
                <option value="coach3">Coach 3</option>
                <option value="coach4">Coach 4</option>
              </select>
            </div>

            <div className="medical-upload-box">
              <label htmlFor="medicalUpload" className="medical-title">Medical Certificate:</label>
              <label htmlFor="medicalUpload" className="upload-btn">Attach File</label>
              <input type="file" id="medicalUpload" accept=".pdf,.jpg,.png" style={{ display: 'none' }} />
            </div>
          </div>

          <table className="schedule-table" id="editable-table">
            <thead>
              <tr>
                <th>Coach</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                        />
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="edit-button-container">
            {!isEditMode && (
              <button className="edit-btn" onClick={handleEditClick}>
                Edit Schedule
              </button>
            )}
          </div>

          <div className="buttons">
            <button type="button" className="confirm-btn" onClick={handleSaveChanges}>
              Confirm
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      </section>

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
}

export default FreeTrainingAdmin;

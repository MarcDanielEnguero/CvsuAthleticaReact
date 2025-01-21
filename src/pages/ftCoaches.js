import React, { useState, useContext } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import TrainingContext from './TrainingContext';
import styles from './ftCoaches.module.css';

const FtCoaches = () => {
  const { formData, coachSelection, setCoachSelection } = useContext(TrainingContext);

  // Declare state variables
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleCoachSelection = (e) => {
    const selectedCoach = e.target.value;
    console.log('Selected coach:', selectedCoach);
    setCoachSelection(selectedCoach);
  };

  const handleConfirmClick = () => {
    console.log('Confirm button clicked');
    if (coachSelection) {
      console.log('Coach selection is valid:', coachSelection);
      setShowModal(true);
    } else {
      console.log('No coach selected');
      setConfirmationMessage('Please select a coach before confirming.');
    }
  };

  const handleConfirmBooking = async () => {
    try {
      const dataToSubmit = { ...formData, coach: coachSelection };
      const response = await axios.post('http://localhost:5000/api/registration', dataToSubmit);
      console.log('Response from server:', response.data);
      setConfirmationMessage('Registration successful! You will be contacted shortly.');
      setShowModal(false);
    } catch (error) {
      console.error('Error during registration:', error);
      setConfirmationMessage('Registration failed. Please try again later.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <section className={styles.coachSection}>
        <div className={styles.registrationBox}>
          <h2>Coach Selection</h2>
          <div className={styles.coachSelectionBox}>
            <label htmlFor="coachSelect" className={styles.selectCoachTitle}>Select Coach:</label>
            <select onChange={handleCoachSelection} className={styles.coachSelect}>
              <option value="">Choose a coach</option>
              <option value="Coach 1">Coach 1</option>
              <option value="Coach 2">Coach 2</option>
              <option value="Coach 3">Coach 3</option>
              <option value="Coach 4">Coach 4</option>
            </select>
          </div>

            {/* Medical Certificate Upload */}
              <div className="medical-upload-box">
              <label htmlFor="medicalUpload" className="medical-title">Medical Certificate:</label>
              <label htmlFor="medicalUpload" className="upload-btn">Attach File</label>
                <input type="file" id="medicalUpload" accept=".pdf,.jpg,.png" style={{ display: 'none' }} />
                </div>

          <table className={styles.scheduleTable}>
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
              <tr>
                <td>Coach 1</td>
                <td>9 AM - 12 PM</td>
                <td>Off</td>
                <td>9 AM - 12 PM</td>
                <td>Off</td>
                <td>9 AM - 12 PM</td>
              </tr>
              <tr>
                <td>Coach 2</td>
                <td>10 AM - 1 PM</td>
                <td>Off</td>
                <td>10 AM - 1 PM</td>
                <td>Off</td>
                <td>10 AM - 1 PM</td>
              </tr>
              <tr>
                <td>Coach 3</td>
                <td>Off</td>
                <td>8 AM - 11 AM</td>
                <td>Off</td>
                <td>8 AM - 11 AM</td>
                <td>Off</td>
              </tr>
              <tr>
                <td>Coach 4</td>
                <td>Off</td>
                <td>9 AM - 12 PM</td>
                <td>Off</td>
                <td>9 AM - 12 PM</td>
                <td>Off</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.buttons}>
            <button type="button" className={styles.confirmBtn} onClick={handleConfirmClick}>
              Confirm
            </button>
          </div>
          {confirmationMessage && <p className={styles.confirmationMessage}>{confirmationMessage}</p>}
        </div>
      </section>



      {showModal && (
        <div id="confirmation-modal" className={`${styles.confirmationModal} ${showModal ? styles.show : ''}`}>
          <div className={styles.confirmationBox}>
            <h3>Are you sure you want to proceed with this information?</h3>
            <button className={styles.confirmBooking} onClick={handleConfirmBooking}>
              Confirm Booking
            </button>
            <button className={styles.cancelBooking} onClick={handleCloseModal}>
              Cancel Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FtCoaches;

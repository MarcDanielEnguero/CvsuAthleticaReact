import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import TrainingContext from './TrainingContext';
import styles from './ftCoaches.module.css';

const FtCoaches = () => {
  const { formData, coachSelection, setCoachSelection } = useContext(TrainingContext);
  const navigate = useNavigate();

  // State Management
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState([]);
  const [coaches] = useState([
    {
      name: 'Coach 1',
      sports: ['Basketball', 'Volleyball'],
      schedule: {
        Monday: '9 AM - 12 PM',
        Wednesday: '9 AM - 12 PM',
        Friday: '9 AM - 12 PM',
      },
    },
    {
      name: 'Coach 2',
      sports: ['Tennis', 'Badminton'],
      schedule: {
        Monday: '10 AM - 1 PM',
        Wednesday: '10 AM - 1 PM',
        Friday: '10 AM - 1 PM',
      },
    },
    {
      name: 'Coach 3',
      sports: ['Track and Field', 'Swimming'],
      schedule: {
        Tuesday: '8 AM - 11 AM',
        Thursday: '8 AM - 11 AM',
      },
    },
    {
      name: 'Coach 4',
      sports: ['Football', 'Rugby'],
      schedule: {
        Tuesday: '9 AM - 12 PM',
        Thursday: '9 AM - 12 PM',
      },
    },
  ]);

  // Validation Check: Ensure form data is complete before allowing coach selection
  useEffect(() => {
    const requiredFields = [
      'firstName', 'lastName', 'studentNumber',
      'phoneNumber', 'college', 'department',
      'course', 'yearSection', 'cvsuEmail',
    ];

    const isFormComplete = requiredFields.every(
      (field) => formData[field] && formData[field].trim() !== ''
    );

    if (!isFormComplete) {
      navigate('/free-training-form');
    }
  }, [formData, navigate]);

  // Coach Selection Handler
  const handleCoachSelection = (e) => {
    setCoachSelection(e.target.value);
    setConfirmationMessage('');
  };

  // Confirm Registration Click
  const handleConfirmClick = () => {
    if (!coachSelection) {
      setConfirmationMessage('Please select a coach before confirming.');
      return;
    }
    setShowModal(true);
  };

  // Confirm Booking Process
  const handleConfirmBooking = async () => {
    setIsLoading(true);
    setConfirmationMessage('');
    setErrorDetails([]);

    try {
      const dataToSubmit = {
        ...formData,
        coach: coachSelection,
        type: 'freeTraining',
      };

      const response = await axios.post('http://localhost:5000/api/registration', dataToSubmit);

      setConfirmationMessage('Registration successful! You will be contacted shortly.');
      setShowModal(false);

      navigate('/confirmation', {
        state: {
          registrationId: response.data.registrationId,
          coachName: coachSelection,
        },
      });
    } catch (error) {
      if (error.response) {
        setErrorDetails(error.response.data.errors || []);
        setConfirmationMessage(error.response.data.error || 'Registration failed. Please try again.');
      } else {
        setConfirmationMessage('An unexpected error occurred. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Close Modal Handler
  const handleCloseModal = () => {
    setShowModal(false);
    setConfirmationMessage('');
    setErrorDetails([]);
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <section className={styles.coachSection}>
        <div className={styles.registrationBox}>
          <h2>Coach Selection</h2>

          <div className={styles.coachSelectionBox}>
            <label htmlFor="coachSelect" className={styles.selectCoachTitle}>
              Select Coach:
            </label>
            <select
              id="coachSelect"
              onChange={handleCoachSelection}
              className={styles.coachSelect}
              value={coachSelection || ''}
            >
              <option value="">Choose a coach</option>
              {coaches.map((coach, index) => (
                <option key={index} value={coach.name}>
                  {coach.name} - {coach.sports.join(', ')}
                </option>
              ))}
            </select>
          </div>

          <table className={styles.scheduleTable}>
            <thead>
              <tr>
                <th>Coach</th>
                <th>Sports</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
            </thead>
            <tbody>
              {coaches.map((coach, index) => (
                <tr key={index}>
                  <td>{coach.name}</td>
                  <td>{coach.sports.join(', ')}</td>
                  <td>{coach.schedule.Monday || 'Off'}</td>
                  <td>{coach.schedule.Tuesday || 'Off'}</td>
                  <td>{coach.schedule.Wednesday || 'Off'}</td>
                  <td>{coach.schedule.Thursday || 'Off'}</td>
                  <td>{coach.schedule.Friday || 'Off'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.confirmBtn}
              onClick={handleConfirmClick}
              disabled={!coachSelection}
            >
              Confirm Coach Selection
            </button>
          </div>

          {confirmationMessage && (
            <div className={styles.confirmationMessage}>
              {confirmationMessage}
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <div className={`${styles.confirmationModal} ${styles.show}`}>
          <div className={styles.confirmationBox}>
            <h3>Confirm Registration</h3>
            {errorDetails.length > 0 && (
              <div className={styles.errorContainer}>
                <h4>Please correct the following:</h4>
                <ul>
                  {errorDetails.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {isLoading ? (
              <div className={styles.loadingSpinner}>Processing registration...</div>
            ) : (
              <>
                <p>You are selecting: {coachSelection}</p>
                <p>Are you sure you want to proceed with this registration?</p>
                <div className={styles.modalButtons}>
                  <button className={styles.confirmBooking} onClick={handleConfirmBooking}>
                    Confirm Booking
                  </button>
                  <button className={styles.cancelBooking} onClick={handleCloseModal}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FtCoaches;

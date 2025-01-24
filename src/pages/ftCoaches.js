import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import TrainingContext from './TrainingContext';
import styles from './ftCoaches.module.css';

const COACHES = [
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
      Tuesday: '10 AM - 1 PM',
      Thursday: '10 AM - 1 PM',
    },
  },
  {
    name: 'Coach 3', 
    sports: ['Track and Field', 'Swimming'],
    schedule: {
      Monday: '8 AM - 11 AM',
      Wednesday: '8 AM - 11 AM',
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
];

const FtCoaches = () => {
  const { formData, coachSelection, setCoachSelection } = useContext(TrainingContext);
  const navigate = useNavigate();

  // State Management
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState([]);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Validation Check
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

  // Notification Banner Component
  const NotificationBanner = React.memo(() => {
    if (!notificationMessage) return null;

    return (
      <div 
        className={`
          ${styles.notificationBanner} 
          ${notificationType === 'success' ? styles.successBanner : styles.errorBanner}
        `}
      >
        {notificationMessage}
      </div>
    );
  });

  // Coach Selection Handler
  const handleCoachSelection = useCallback((e) => {
    setCoachSelection(e.target.value);
    setConfirmationMessage('');
  }, [setCoachSelection]);

  // Confirm Registration Click
  const handleConfirmClick = useCallback(() => {
    if (!coachSelection) {
      setConfirmationMessage('Please select a coach before confirming.');
      return;
    }
    setShowModal(true);
  }, [coachSelection]);

  // Confirm Booking Process
  const handleConfirmBooking = useCallback(async () => {
    setIsLoading(true);
    setNotificationType(null);
    setNotificationMessage('');
    setConfirmationMessage('');
    setErrorDetails([]);

    try {
      const dataToSubmit = {
        ...formData,
        coach: coachSelection,
        type: 'freeTraining',
      };

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/registration`, dataToSubmit, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Success Handling
      setNotificationType('success');
      setNotificationMessage('Registration successful! A confirmation email has been sent.');
      
      // Navigate to confirmation page
      navigate('/confirmation', {
        state: {
          registrationId: response.data.registrationId,
          coachName: coachSelection,
        },
      });
    } catch (error) {
      // Error Handling
      setNotificationType('error');
      setShowModal(false);

      if (error.response) {
        const errors = error.response.data.errors || [];
        setErrorDetails(errors);
        setNotificationMessage(
          errors.length > 0 
            ? errors.join(', ') 
            : (error.response.data.error || 'Registration failed. Please try again.')
        );
      } else {
        setNotificationMessage('An unexpected error occurred. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, coachSelection, navigate]);

  // Close Modal Handler
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setConfirmationMessage('');
    setErrorDetails([]);
  }, []);

  // Coach Schedule Modal
  const CoachScheduleModal = React.memo(() => {
    if (!showModal) return null;

    return (
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
                <button 
                  className={styles.confirmBooking} 
                  onClick={handleConfirmBooking}
                >
                  Confirm Booking
                </button>
                <button 
                  className={styles.cancelBooking} 
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <Navbar />
      <NotificationBanner />

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
              {COACHES.map((coach, index) => (
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
              {COACHES.map((coach, index) => (
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

      <CoachScheduleModal />
    </div>
  );
};

export default React.memo(FtCoaches);
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import TrainingContext from './TrainingContext';
import styles from './ftCoaches.module.css';

const FtCoaches = () => {
  const { formData, coachSelection, setCoachSelection, setFormData } = useContext(TrainingContext);
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

    const isFormComplete = requiredFields.every(field =>
      formData[field] && formData[field].trim() !== ''
    );

    if (!isFormComplete) {
      navigate('/free-training-form');
    }
  }, [formData, navigate]);

  // Coach Selection Handler
  const handleCoachSelection = (e) => {
    const selectedCoach = e.target.value;
    setCoachSelection(selectedCoach);
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
      // Combine form data with coach selection
      const dataToSubmit = {
        ...formData,
        coach: coachSelection,
        type: 'free-training',  // Add the form type for identifying the registration
      };

      // Send registration data to backend
      const response = await axios.post('http://localhost:5000/api/free-training', dataToSubmit);

      // Handle successful registration
      setConfirmationMessage('Registration successful! You will be contacted shortly.');
      setShowModal(false);
      
      // Navigate to confirmation page with registrationId
      navigate('/confirmation', {
        state: {
          registrationId: response.data.registrationId,
          coachName: coachSelection,
        },
      });

    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);

      // Handle different error scenarios
      if (error.response) {
        const errorData = error.response.data;
        
        if (errorData.errors) {
          // Validation errors from backend
          setErrorDetails(errorData.errors);
          setConfirmationMessage('Registration failed. Please check the details.');
        } else if (errorData.error) {
          // Specific error message from backend
          setConfirmationMessage(errorData.error);
        } else {
          setConfirmationMessage('Registration failed. Please try again.');
        }
      } else if (error.request) {
        // No response from server
        setConfirmationMessage('No response from server. Please check your internet connection.');
      } else {
        // Request setup error
        setConfirmationMessage('An unexpected error occurred.');
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
          
          {/* Coach Selection Dropdown */}
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

          {/* Coach Schedules Table */}
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

          {/* Confirmation Buttons */}
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

          {/* Confirmation Message */}
          {confirmationMessage && (
            <div className={styles.confirmationMessage}>
              {confirmationMessage}
            </div>
          )}
        </div>
      </section>

      {/* Confirmation Modal */}
      {showModal && (
        <div className={`${styles.confirmationModal} ${styles.show}`}>
          <div className={styles.confirmationBox}>
            <h3>Confirm Registration</h3>
            
            {/* Error Details */}
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

            {/* Loading State */}
            {isLoading ? (
              <div className={styles.loadingSpinner}>
                Processing registration...
              </div>
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
      )}
    </div>
  );
};

export default FtCoaches;

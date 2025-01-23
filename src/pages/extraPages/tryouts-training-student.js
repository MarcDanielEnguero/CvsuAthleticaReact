import React, { useState, useEffect } from 'react';
import styles from './tryouts-training-student.module.css';
import Navbar from '../Navbar';
import axios from 'axios';

const TryoutsTraining = () => {
  const [registrations, setRegistrations] = useState([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/registration');
        setRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancelButtonClick = (registrationId) => {
    setSelectedRegistrationId(registrationId);
    setConfirmationVisible(true);
  };

  const handleConfirmCancel = async () => {
    if (selectedRegistrationId) {
      try {
        await axios.delete(`http://localhost:5000/api/registration/${selectedRegistrationId}`);
        setRegistrations((prev) => prev.filter((reg) => reg._id !== selectedRegistrationId));
        console.log('Booking canceled successfully.');
      } catch (error) {
        console.error('Error canceling booking:', error);
      } finally {
        setConfirmationVisible(false);
        setSelectedRegistrationId(null);
      }
    }
  };

  const tryouts = registrations.filter((reg) => reg.type === 'tryouts');
  const freeTraining = registrations.filter((reg) => reg.type === 'freeTraining');

  return (
    <div>
      <Navbar />
      <section className={styles.mainContents}>
        <h1>TRYOUTS/TRAINING</h1>
        <h2>TRYOUTS & TRAINING SCHEDULE</h2>
      </section>

      <section className={styles.activeHistoryTitle}>
        <h2>Active Booking</h2>
      </section>

      {/* Tryouts Section */}
      <section className={styles.tryoutsContainer}>
        <h2>Tryouts</h2>
        {isLoading ? (
          <p>Loading Tryouts...</p>
        ) : (
          <table className={styles.tryoutsTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>College/Department</th>
                <th>Course/Year/Section</th>
                <th>Coach</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tryouts.length > 0 ? (
                tryouts.map((registration) => (
                  <tr key={registration._id}>
                    <td>{registration.firstName} {registration.lastName}</td>
                    <td>{registration.college} / {registration.department}</td>
                    <td>{registration.course} / {registration.yearSection}</td>
                    <td>{registration.coach}</td>
                    <td>{registration.type}</td>
                    <td>
                      <button
                        className={styles.confirmCancelBookingButton}
                        onClick={() => handleCancelButtonClick(registration._id)}
                      >
                        Cancel Booking
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No tryouts found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>

      {/* Free Training Section */}
      <section className={styles.tryoutsContainer}>
        <h2>Free Training</h2>
        {isLoading ? (
          <p>Loading Free Training...</p>
        ) : (
          <table className={styles.trainingTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>College/Department</th>
                <th>Course/Year/Section</th>
                <th>Coach</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {freeTraining.length > 0 ? (
                freeTraining.map((training) => (
                  <tr key={training._id}>
                    <td>{training.firstName} {training.lastName}</td>
                    <td>{training.college} / {training.department}</td>
                    <td>{training.course} / {training.yearSection}</td>
                    <td>{training.coach}</td>
                    <td>{training.type}</td>
                    <td>
                      <button
                        className={styles.confirmCancelBookingButton}
                        onClick={() => handleCancelButtonClick(training._id)}
                      >
                        Cancel Booking
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No free training available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>

      {/* Confirmation Modal */}
      {confirmationVisible && (
        <div className={styles.confirmationModal}>
          <div className={styles.confirmationBox}>
            <h3>Are you sure you want to cancel this slot? This action cannot be undone.</h3>
            <div className={styles.modalButtons}>
              <button className={styles.confirm} onClick={handleConfirmCancel}>Confirm</button>
              <button className={styles.cancel} onClick={() => setConfirmationVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
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

export default TryoutsTraining;

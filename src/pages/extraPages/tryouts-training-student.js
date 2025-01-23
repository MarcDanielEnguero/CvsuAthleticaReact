import React, { useState, useEffect } from 'react';
import styles from './tryouts-training-student.module.css';
import Navbar from '../Navbar';
import axios from 'axios';

const TryoutsTraining = () => {
  const [trainingData, setTrainingData] = useState({
    tryouts: [],
    freeTraining: []
  });

  const [registrations, setRegistrations] = useState([]);
  const [coaches, setCoaches] = useState({});
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [target, setTarget] = useState('');

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch registration data
        const registrationResponse = await axios.get('http://localhost:5000/api/registration');
        console.log('Fetched registrations:', registrationResponse.data);
        setRegistrations(registrationResponse.data); // Store registration data

        // Fetch coach data
        const coachResponse = await axios.get('http://localhost:5000/api/coaches');
        console.log('Fetched coaches:', coachResponse.data);
        const coachMap = coachResponse.data.reduce((acc, coach) => {
          acc[coach.sport] = coach; // Store coaches by sport type or any other key
          return acc;
        }, {});
        setCoaches(coachMap); // Store coaches data in the state

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCancelButtonClick = (type) => {
    if (type === 'tryouts' && cancelled) {
      setAlertVisible(true);
    } else {
      setConfirmationVisible(true);
      setTarget(type);
    }
  };

  const handleConfirmCancel = () => {
    if (target === 'tryouts' || target === 'training') {
      setCancelled(true);
    }
    setConfirmationVisible(false);
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
  };

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
        <h2>Try-outs</h2>
        <table className={styles.tryoutsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>College/Department</th>
              <th>Course/Year/Section</th>
              <th>Sport</th>
              <th>Time & Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length > 0 ? (
              registrations.map((registration) => (
                <tr key={registration._id}>
                  <td>{registration.firstName} {registration.lastName}</td>
                  <td>{registration.college}</td>
                  <td>{registration.course} / {registration.yearSection}</td>
                  <td>{coaches[registration.sport]?.name || 'Not Assigned'}</td>
                  <td>{/* Add any time/date logic if applicable */}</td>
                  <td className={styles.statusCell}>{registration.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No registrations found</td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          className={styles.confirmCancelBookingButton}
          style={{ backgroundColor: cancelled ? 'gray' : '' }}
          onClick={() => handleCancelButtonClick('tryouts')}
        >
          Cancel Booking
        </button>
      </section>

      {/* Free Training Section */}
      <section className={styles.tryoutsContainer}>
        <h2>Free Training</h2>
        <table className={styles.trainingTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>College/Department</th>
              <th>Course/Year/Section</th>
              <th>Sport</th>
              <th>Time & Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {trainingData.freeTraining.length > 0 ? (
              trainingData.freeTraining.map((training, index) => (
                <tr key={index}>
                  <td>{training.name}</td>
                  <td>{training.college}</td>
                  <td>{training.courseYearSection}</td>
                  <td>{training.sport}</td>
                  <td>{training.timeAndDate}</td>
                  <td className={styles.statusCell}>{cancelled ? '' : 'Confirmed'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No free training available</td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          className={styles.confirmCancelBookingButton}
          style={{ backgroundColor: cancelled ? 'gray' : '' }}
          onClick={() => handleCancelButtonClick('training')}
        >
          Cancel Booking
        </button>
      </section>

      {/* Confirmation and Alert Modals */}
      {confirmationVisible && (
        <div id="confirmation-modal" className={styles.confirmationModal}>
          <div className={styles.confirmationBox}>
            <h3>Are you sure you want to cancel this slot? This action cannot be undone.</h3>
            <div className={styles.modalButtons}>
              <button className={styles.confirm} onClick={handleConfirmCancel}>Confirm</button>
              <button className={styles.cancel} onClick={() => setConfirmationVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {alertVisible && (
        <div id="alert-modal" className={styles.confirmationModal}>
          <div className={styles.confirmationBox}>
            <h3>⚠️ALERT⚠️</h3>
            <h2>Cancellation is not allowed after 24 hours. For assistance, kindly contact support.</h2>
            <button id="okButton" className={styles.ok} onClick={handleAlertClose}>OK</button>
          </div>
        </div>
      )}

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

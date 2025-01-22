import React, { useState } from 'react';
import styles from './tryouts-training-student.module.css';
import Navbar from './Navbar';  // Import Navbar component

const TryoutsTraining = () => {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [target, setTarget] = useState('');

  // Handle cancel button click
  const handleCancelButtonClick = (type) => {
    if (type === 'tryouts' && cancelled) {
      setAlertVisible(true);
    } else {
      setConfirmationVisible(true);
      setTarget(type);
    }
  };

  // Confirm cancellation
  const handleConfirmCancel = () => {
    if (target === 'tryouts') {
      setCancelled(true); // Mark tryouts as cancelled
    }
    if (target === 'training') {
      setCancelled(true); // Mark training as cancelled
    }
    setConfirmationVisible(false);
  };

  // Handle alert modal close
  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  return (
    <div>
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <section className={styles.mainContents}>
        <h1>TRYOUTS/TRAINING</h1>
        <h2>TRYOUTS & TRAINING SCHEDULE</h2>
      </section>

      {/* Active History Title */}
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
            <tr>
              <td>Jane Smith</td>
              <td>CEIT</td>
              <td>BSCS 3-2</td>
              <td>Badminton</td>
              <td>10:00am-12:00pm, January 10, 2025</td>
              <td className={styles.statusCell}>{cancelled ? '' : 'Confirmed'}</td>
            </tr>
          </tbody>
        </table>
        <h3>Coach: Labrador Colirado</h3>
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
            <tr>
              <td>Jane Smith</td>
              <td>CEIT</td>
              <td>BSCS 3-2</td>
              <td>Javelin</td>
              <td>10:00am-12:00pm, January 10, 2025</td>
              <td className={styles.statusCell}>{cancelled ? '' : 'Confirmed'}</td>
            </tr>
          </tbody>
        </table>
        <h3>Coach: Labrador Colirado</h3>
        <button
          className={styles.confirmCancelBookingButton}
          style={{ backgroundColor: cancelled ? 'gray' : '' }}
          onClick={() => handleCancelButtonClick('training')}
        >
          Cancel Booking
        </button>
      </section>

      {/* Confirmation Modal */}
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

      {/* Alert Modal */}
      {alertVisible && (
        <div id="alert-modal" className={styles.confirmationModal}>
          <div className={styles.confirmationBox}>
            <h3>⚠️ALERT⚠️</h3>
            <h2>Cancellation is not allowed after 24 hours. For assistance, kindly contact support.</h2>
            <button id="okButton" className={styles.ok} onClick={handleAlertClose}>OK</button>
          </div>
        </div>
      )}

      {/* Footer with Email Contacts */}
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

import React, { useState } from 'react';
import './style.css';
import './tryouts-training-student.css';
import './tryouts-training.css';

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
      {/* Navigation Bar */}
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
          <li><a href="#">TRYOUTS/TRAINING</a></li>
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

      {/* Main Content */}
      <section className="main-contents">
        <h1>TRYOUTS/TRAINING</h1>
        <h2>TRYOUTS & TRAINING SCHEDULE</h2>
      </section>

      {/* Active History Title */}
      <section className="active-history-title">
        <h2>Active Booking</h2>
      </section>

      {/* Tryouts Section */}
      <section className="tryouts-container">
        <h2>Try-outs</h2>
        <table id="tryouts-table1">
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
              <td className="status-cell">{cancelled ? '' : 'Confirmed'}</td>
            </tr>
          </tbody>
        </table>
        <h3>Coach: Labrador Colirado</h3>
        <button
          className="confirm-cancel-booking-button"
          style={{ backgroundColor: cancelled ? 'gray' : '' }}
          onClick={() => handleCancelButtonClick('tryouts')}
        >
          Cancel Booking
        </button>
      </section>

      {/* Free Training Section */}
      <section className="tryouts-container">
        <h2>Free Training</h2>
        <table id="training-table2">
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
              <td className="status-cell">{cancelled ? '' : 'Confirmed'}</td>
            </tr>
          </tbody>
        </table>
        <h3>Coach: Labrador Colirado</h3>
        <button
          className="confirm-cancel-booking-button"
          style={{ backgroundColor: cancelled ? 'gray' : '' }}
          onClick={() => handleCancelButtonClick('training')}
        >
          Cancel Booking
        </button>
      </section>

      {/* Confirmation Modal */}
      {confirmationVisible && (
        <div id="confirmation-modal" className="confirmation-modal">
          <div className="confirmation-box">
            <h3>Are you sure you want to cancel this slot? This action cannot be undone.</h3>
            <div className="modal-buttons">
              <button className="confirm" onClick={handleConfirmCancel}>Confirm</button>
              <button className="cancel" onClick={() => setConfirmationVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {alertVisible && (
        <div id="alert-modal" className="confirmation-modal">
          <div className="confirmation-box">
            <h3>⚠️ALERT⚠️</h3>
            <h2>Cancellation is not allowed after 24 hours. For assistance, kindly contact support.</h2>
            <button id="okButton" className="ok" onClick={handleAlertClose}>OK</button>
          </div>
        </div>
      )}

      {/* Footer with Email Contacts */}
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
};

export default TryoutsTraining;

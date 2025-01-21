import React from 'react';
import Navbar from '../Navbar'; // Import Navbar component
import styles from './coach-profile.module.css'; // Import the CSS Module

function CoachProfile() {
  return (
    <div>
      {/* Use the Navbar component */}
      <Navbar />

      {/* Profile Container */}
      <div className={styles.profileContainer}>
        <h1>Profile</h1>
        <div className={styles.profileContent}>
          <div className={styles.profileIcon}>
            <i className="fas fa-user-circle fa-10x"></i>
            <p><a href="#">Upload Photo</a></p>
            <h2>PROFESSOR</h2>
          </div>
          <div className={styles.profileDetails}>
            <form>
              <table>
                <tr>
                  <td>
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" />
                  </td>
                  <td>
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="trainer-code">Trainer Code</label>
                    <input type="text" id="trainer-code" name="trainer-code" />
                  </td>
                  <td>
                    <label htmlFor="phone-no">Phone No.</label>
                    <input type="text" id="phone-no" name="phone-no" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="college">College</label>
                    <input type="text" id="college" name="college" />
                  </td>
                  <td>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" />
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </div>
      </div>

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
}

export default CoachProfile;

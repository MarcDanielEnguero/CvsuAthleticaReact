import React from 'react';
import styles from './ContactUs.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../pages/Navbar';
import profilePic from '../assets/img/ContactUs/pfp.png';
import backgroundImage from '../assets/img/ContactUs/background-image.png';

const ContactUs = () => {
  const feedbacks = [
    {
      name: 'Anonymous',
      time: '12:46 PM 10/12/1999',
      comment: 'The training was hard but it\'s totally worth it!',
      likes: 153,
      dislikes: 3
    },
    {
      name: 'MacMac Dalanon',
      time: '1:46 PM 10/12/1999',
      comment: 'Masyadong mahigpit yung coach, di kame pinapainom ng water!',
      likes: 10,
      dislikes: 15
    },
    {
      name: 'Humprey Kokey',
      time: '1:47 PM 10/12/1999',
      comment: 'Naiwan ni Coach yung sweater niya saktong 3rd of December sa bahay',
      likes: 150,
      dislikes: 54
    },
    {
      name: 'Elreen Gandara',
      time: '2:47 PM 10/12/1999',
      comment: 'Ang hot ng coach umaattend lang ako dahil sa kanya!',
      likes: 5,
      dislikes: 253
    }
  ];

  const teamMembers = [
    {
      name: 'Jeezay P. Martinez',
      role: 'Tester',
      email: 'main.jeezay.martinez@cvsu.edu.ph',
      phone: '09363625388'
    },
    {
      name: 'Elreen Aya De Guzman',
      role: 'PM',
      email: 'main.elreenaya.deguzman@cvsu.edu.ph',
      phone: '09155334879'
    },
    {
      name: 'Rianne Khynna A De Guzman',
      role: 'Developer',
      email: 'main.riannekhynna.deguzman@cvsu.edu.ph',
      phone: '09392236302'
    },
    {
      name: 'Marco C Dalanoan',
      role: 'System Analyst/Documentor',
      email: 'main.marco.dalanon@cvsu.edu.ph',
      phone: '09690984080'
    },
    {
      name: 'Alyra Zarina Santarin',
      role: 'System Administrator',
      email: 'main.alyrazarina.santarin@cvsu.edu.ph',
      phone: '09204950338'
    },
    {
      name: 'John Patrick Villanueva',
      role: 'Developer',
      email: 'main.johnpatrick.villanueva@cvsu.edu.ph',
      phone: '09059625006'
    },
    {
      name: 'Marc Daniel Enguero',
      role: 'Developer',
      email: 'main.marcdaniel.enguero@cvsu.edu.ph',
      phone: '09760791434'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className={styles.container}>
      <Navbar />
      
      <div className={styles.bannerSection} style={{ backgroundImage: `url(${backgroundImage})` }} />

      <div className={styles.feedbackSection}>
        <h2>Feedbacks</h2>
        <div className={styles.feedbackContainer}>
          {feedbacks.map((feedback, index) => (
            <div key={index} className={styles.feedbackItem}>
              <div className={styles.commentHeader}>
                <strong>{feedback.name}</strong>
                <span className={styles.commentTime}>Sent: {feedback.time}</span>
              </div>
              <p>{feedback.comment}</p>
              <div className={styles.commentActions}>
                <span>
                  {feedback.likes} <FontAwesomeIcon icon={faThumbsUp} className={styles.likeIcon} />
                </span>
                <span>
                  {feedback.dislikes} <FontAwesomeIcon icon={faThumbsDown} className={styles.dislikeIcon} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.feedbackFormSection}>
        <h2>Send us a Feedback!</h2>
        <form className={styles.feedbackForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.formField}>
              <label htmlFor="name">Name (Optional):</label>
              <input type="text" id="name" name="name" placeholder="Enter your name" />
            </div>
            <div className={styles.formField}>
              <label htmlFor="college">College (Optional):</label>
              <select id="college" name="college">
                <option value="" disabled selected>Select your college</option>
                <option value="CEIT">CEIT</option>
                <option value="CAS">CAS</option>
                <option value="CVMBS">CVMBS</option>
                <option value="CAFENR">CAFENR</option>
                <option value="CED">CED</option>
              </select>
            </div>
            <div className={styles.formField}>
              <label htmlFor="sport">Sport (Optional):</label>
              <select id="sport" name="sport">
                <option value="" disabled selected>Select your sport</option>
                <option value="Basketball">Basketball</option>
                <option value="Volleyball">Volleyball</option>
                <option value="Football">Football</option>
                <option value="Athletics">Athletics</option>
              </select>
            </div>
          </div>
          <div className={styles.formField}>
            <label htmlFor="feedback">Feedback:</label>
            <textarea id="feedback" name="feedback" rows="5" placeholder="Enter your feedback here..." />
          </div>
          <button type="submit" className={styles.submitBtn}>Submit</button>
        </form>
      </div>

      <div className={styles.contactUsSection}>
        <h2>CONTACT US</h2>
        <div className={styles.contactGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.contactCard}>
              <img src={profilePic} alt="Profile" />
              <h3>{member.name} - {member.role}</h3>
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> {member.email}
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} /> {member.phone}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footerBar}>
        <div className={styles.emailContact}>
          <FontAwesomeIcon icon={faEnvelope} /> email1@periodt.com
        </div>
        <div className={styles.emailContact}>
          <FontAwesomeIcon icon={faEnvelope} /> email2@periodt.com
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
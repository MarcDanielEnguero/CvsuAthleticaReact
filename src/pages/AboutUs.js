import React from 'react';
import styles from './AboutUs.module.css';
import historicalBackground from '../assets/img/AboutUs/historical.png';
import coachPicture from '../assets/img/coach.png';



const AboutUs = () => {
  return (
    <>
      <div className={styles.bannerSection}></div>

      <div className={styles.historicalSection}>
        <h2>HISTORICAL BACKGROUND</h2>
        <div className={styles.historicalContent}>
          <div className={styles.historicalText}>
            <p>IN 1998, THE FORMER DON SEVERINO AGRICULTURAL COLLEGE WAS CONVERTED INTO A STATE UNIVERSITY BY VIRTUE OF REPUBLIC ACT NO. 8468. THIS IMPORTANT EVENT HAPPENED ON JANUARY 22, 1998, HENCE THE CAVITE STATE UNIVERSITY.</p>
            <p>IN THE FIRST SEMESTER OF SCHOOL YEAR 1998-1999, THE DEPARTMENT OF PHYSICAL EDUCATION AND RECREATION UNDER THE SCHOOL OF EDUCATION WAS ELEVATED INTO A COLLEGE. IT WAS CONCEIVED TO PROVIDE THE STUDENTS ADEQUATE OPPORTUNITIES TO CONTINUOUSLY PARTICIPATE IN A DEVELOPMENT PROGRAM OF PHYSICAL ACTIVITIES WHICH ARE HELPFUL, INTELLECTUALLY INVIGORATING, MORALLY UPLIFTING, SOCIALLY INSIGNIFICANT, CULTURALLY ENHANCING, ENVIRONMENT ORIENTED AND TO PRODUCE COMPETENT MANPOWER TO ASSIST IN THE PREPARATION AND IMPLEMENTATION OF PROGRAMS IN PHYSICAL EDUCATION, SPORTS AND RECREATION.</p>
          </div>
          <div className={styles.imageBox}>
            <img src={historicalBackground} alt="Historical Background" />
          </div>
        </div>
      </div>

      <div className={styles.valuesCardContainer}>
        <div className={styles.valuesCard}>
          <h3 className={styles.valuesTitle}>COLLEGE VISION</h3>
          <p className={styles.valuesDetails}>
            The College of Sports, Physical Education, and Recreation shall provide leadership; formulate policies and set priorities and directions in the promotion and development of all amateur sports in Southern Tagalog Region. This will involve all provincial training institutes, other state universities and colleges, and interested public and private institutions in the region.
          </p>
        </div>
        <div className={styles.valuesCard}>
          <h3 className={styles.valuesTitle}>COLLEGE MISSION</h3>
          <p className={styles.valuesDetails}>
            The task of the College of Sports, Physical Education and Recreation is to provide undergraduate and advanced instruction in Physical Education and Recreation sciences. It strives to develop persons committed to the pursuit of excellence in Physical Education and Recreation studies who are able to translate into action concepts and values necessary to improve the quality of life of the Filipino. It also aims to promote Physical Education, sports, and recreation among the studentry and other constituents of the university.
          </p>
        </div>
      </div>

      <div className={styles.coachTitle}>
        <h2>COACHES</h2>
      </div>
      <div className={styles.coachGridContainer}>
        <div className={styles.coachCard}>
          <img src={coachPicture} alt="Marco C. Dalanon" />
          <h3>Marco C. Dalanon</h3>
          <p>BASKETBALL & SCAMMER COACH</p>
          <p>marco.dalanon@cvsu.edu.ph</p>
          <p>09363625388</p>
        </div>
        <div className={styles.coachCard}>
          <img src={coachPicture} alt="Elreen Aya De Guzman" />
          <h3>Elreen Aya De Guzman</h3>
          <p>TENNIS COACH</p>
          <p>elreen.aya.deguzman@cvsu.edu.ph</p>
          <p>09155334879</p>
        </div>
        <div className={styles.coachCard}>
          <img src={coachPicture} alt="Elreen Aya De Guzman" />
          <h3>Elreen Aya De Guzman</h3>
          <p>SOCCER, SWIMMING COACH</p>
          <p>elreen.aya.deguzman@cvsu.edu.ph</p>
          <p>09155334879</p>
        </div>
        <div className={styles.coachCard}>
          <img src={coachPicture} alt="Marco C. Dalanon" />
          <h3>Marco C. Dalanon</h3>
          <p>BASKETBALL & SCAMMER COACH</p>
          <p>marco.dalanon@cvsu.edu.ph</p>
          <p>09363625388</p>
        </div>
        <div className={styles.coachCard}>
          <img src={coachPicture} alt="Elreen Aya De Guzman" />
          <h3>Elreen Aya De Guzman</h3>
          <p>TENNIS COACH</p>
          <p>elreen.aya.deguzman@cvsu.edu.ph</p>
          <p>09155334879</p>
        </div>
        <div className={styles.coachCard}>
          <img src={coachPicture} alt="Elreen Aya De Guzman" />
          <h3>Elreen Aya De Guzman</h3>
          <p>SOCCER, SWIMMING COACH</p>
          <p>elreen.aya.deguzman@cvsu.edu.ph</p>
          <p>09155334879</p>
        </div>
      </div>
    
      <div className={styles.adminTitle}>
          <h2>ADMINS</h2>
        </div>
        <div className={styles.adminGridContainer}>
          <div className={styles.adminCard}>
            <img src={coachPicture} alt="Admin 1" />
            <h3>Admin 1 Name</h3>
            <p>Position</p>
            <p>admin1.email@domain.com</p>
            <p>09123456789</p>
          </div>
          <div className={styles.adminCard}>
            <img src={coachPicture} alt="Admin 2" />
            <h3>Admin 2 Name</h3>
            <p>Position</p>
            <p>admin2.email@domain.com</p>
            <p>09876543210</p>
          </div>
        </div>


      <div className={styles.footerBar}>
        <div className={styles.emailContact}>
          <i className="fa fa-envelope"></i> email1@periodt.com
        </div>
        <div className={styles.emailContact}>
          <i className="fa fa-envelope"></i> email2@periodt.com
        </div>
      </div>

      
    </>
  );
};

export default AboutUs;
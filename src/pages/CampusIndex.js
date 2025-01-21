import React from 'react';
import Navbar from '../pages/Navbar';
import styles from './CampusIndex.module.css';
import MainCampusLogo from '../assets/img/CampusIndex/cvsu-logo.png';
import MainCampusInfoIndex from './MainCampusInfoIndex';
import CampusInfoIndex from './CampusInfoIndex';

const CampusIndex = () => {
  const campuses = [
    { name: "DON SEVERINO DE LAS ALAS CAMPUS", link: "./MainCampusInfoIndex" },
    { name: "NAIC CAMPUS", link: "./CampusInfoIndex" },
    { name: "GENERAL TRIAS CAMPUS", link: "general-trias-campus-page.html" },
    { name: "CAVITE CITY CAMPUS", link: "korea-campus-page.html" },
    { name: "CCAT CAMPUS", link: "manila-campus-page.html" },
    { name: "CARMONA TRIAS CAMPUS", link: "mindanao-campus-page.html" },
    { name: "IMUS CAMPUS", link: "mindanao-campus-page.html" },
    { name: "TRECE MARTIRES CAMPUS", link: "mindanao-campus-page.html" },
    { name: "SILANG CAMPUS", link: "mindanao-campus-page.html" },
    { name: "TANZA CAMPUS", link: "mindanao-campus-page.html" },
    { name: "BACOOR CAMPUS", link: "mindanao-campus-page.html" },
    { name: "MARAGONDON CAMPUS", link: "mindanao-campus-page.html" }
  ];

  return (
    <div>
      <Navbar />
      <div className={styles.bannerSection}></div>
      <div className={styles.campusSection}>
        <h1 className={styles.campusTitle}>CAMPUS</h1>
        <div className={styles.campusGrid}>
          {campuses.map((campus, index) => (
            <a key={index} href={campus.link} className={styles.campusBox}>
              <img 
                src={MainCampusLogo} 
                alt={`${campus.name} Logo`} 
                className={styles.campusLogo}
              />
              <p>CAVITE STATE UNIVERSITY<br/>{campus.name}</p>
            </a>
          ))}
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
    </div>
  );
};

export default CampusIndex;
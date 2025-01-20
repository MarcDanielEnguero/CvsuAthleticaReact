import React from 'react';
import Navbar from '../pages/Navbar'; // Assuming your Navbar component is here
import styles from './MainCampusInfoIndex.module.css';
import MainCampusLogo from '../assets/img/MainCampusInfoIndex/cvsu-logo.png';

const MainCampusInfoIndex = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            
            {/* Banner Section */}
            <div className={styles.bannerSection}></div>

            {/* Main Campus Section */}
            <div className={styles.mainCampusContainer}>
                <h1 className={styles.campusTitle}>CAMPUS</h1>

                <div className={styles.contentContainer}>
                    {/* Main Campus Box */}
                    <div className={styles.mainCampusBox}>
                        <img src={MainCampusLogo} alt="Main Campus Logo" className={styles.campusLogo} />
                        <p>CAVITE STATE UNIVERSITY<br />DON SEVERINO DE LAS ALAS CAMPUS</p>
                    </div>

                    {/* Colleges Section */}
                    <div className={styles.collegesContainer}>
                        <h2 className={styles.collegesTitle}>COLLEGES</h2>
                        <div className={styles.collegesGrid}>
                            {['hornets', 'cafenr', 'cas', 'ccj', 'ced', 'ceit', 'cemds', 'con', 'cspear', 'cvmbs'].map((college, index) => (
                                <a key={index} href="#" className={styles.detailsBox}>
                                    <img src={`./pics/${college}-logo.png`} alt={`${college} Logo`} />
                                    <p>{college.toUpperCase()}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bar */}
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

export default MainCampusInfoIndex;

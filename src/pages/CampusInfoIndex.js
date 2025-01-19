import React, { useEffect } from 'react';
import Navbar from './Navbar';
import styles from './CampusInfoIndex.module.css'; // Import the CSS Module
import MainCampusLogo from '../assets/img/CampusInfoIndex/cvsu-logo.png';
import playerImage from '../assets/img/CampusInfoIndex/player-img.png';

const CampusInfoIndex = () => {
  useEffect(() => {
    const menuButton = document.getElementById('menuButton');
    const dropdownMenu = document.getElementById('dropdownMenu');

    // Toggle the active class when the menu button is clicked
    const toggleMenu = () => {
      menuButton.classList.toggle(styles.active);
      dropdownMenu.classList.toggle(styles.active);
    };

    menuButton.addEventListener('click', toggleMenu);

    // Close the dropdown when a link is clicked
    const handleLinkClick = () => {
      menuButton.classList.remove(styles.active);
      dropdownMenu.classList.remove(styles.active);
    };

    dropdownMenu.querySelectorAll(`.${styles.sportsLink}`).forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });

    // Cleanup event listeners when the component unmounts
    return () => {
      menuButton.removeEventListener('click', toggleMenu);
      dropdownMenu.querySelectorAll(`.${styles.sportsLink}`).forEach(link => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);

  return (
    <div>
      <Navbar />

      <div className={styles.universityHeader}>
        <div className={styles.logoContainer}>
          <img src={MainCampusLogo} alt="University Logo" className={styles.universityLogo} />
        </div>
        <div className={styles.headerText}>
          <h1>CAVITE STATE UNIVERSITY <br /> <span>GENERAL TRIAS CAMPUS</span></h1>
        </div>
      </div>

      <div className={styles.menuContainer}>
        <div className={styles.menuButton} id="menuButton">
          <div className={styles.menuIcon}></div>
        </div>
        <div className={styles.dropdownMenu} id="dropdownMenu">
          <h1 className={styles.menuTitle}>SPORTS</h1>
          <ul className={styles.sportsList}>
            <li><a href="./basketball-info/index.html" className={styles.sportsLink}>BASKETBALL</a></li>
            <li><a href="./volleyball-info/index.html" className={styles.sportsLink}>VOLLEYBALL</a></li>
            <li><a href="./baseball-info/index.html" className={styles.sportsLink}>BASEBALL</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.teamName}>
        <h1>TIGERIST</h1>
      </div>

      <div className={styles.playerContainer}>
        <div className={styles.playerInfo}>
          <div className={styles.playerText}>
            <h3>HUMPHREY DWIGHT LEWIS OCAY</h3>
            <p>21 YEARS OLD</p>
            <p>COLLEGE OF ENGINEERING AND TECHNOLOGY</p>
            <p>JERSEY NUMBER: <span>6</span></p>
          </div>
          <div className={styles.playerImage}>
            <img src={playerImage} alt="Humphrey Ocay" />
          </div>
        </div>

        <div className={styles.playerInfo}>
          <div className={styles.playerText}>
            <h3>JEEZAY MARTINEZ</h3>
            <p>21 YEARS OLD</p>
            <p>COLLEGE OF ENGINEERING AND TECHNOLOGY</p>
            <p>JERSEY NUMBER: <span>23</span></p>
          </div>
          <div className={styles.playerImage}>
            <img src={playerImage} alt="Jeezay Martinez" />
          </div>
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

export default CampusInfoIndex;

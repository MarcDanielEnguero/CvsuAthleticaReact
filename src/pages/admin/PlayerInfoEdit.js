import React from 'react';
import styles from './PlayerInfoAdd.module.css';

const PlayerInfoEdit = () => {
    return (
        <div>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <img src="./pics/logo.png" alt="Logo" />
                </div>
                <div className={styles.searchBar}>
                    <i className="fas fa-search"></i>
                    <input type="text" id="searchInput" placeholder="Search" />
                </div>
                <ul className={styles.navLinks}>
                    <li><a href="#">HOME</a></li>
                    <li><a href="#">ABOUT</a></li>
                    <li><a href="#">TRYOUTS</a></li>
                    <li><a href="#">EVENTS</a></li>
                    <li><a href="#">CAMPUS</a></li>
                    <li><a href="#">CONTACT US</a></li>
                    <li><a href="#">LOGIN</a></li>
                </ul>
                <div className={styles.notifications}>
                    <i className="fas fa-bell"></i>
                </div>
            </nav>

            <div className={styles.headerRow}>
                <h2 className={styles.formTitle}>EDIT PLAYER PROFILE</h2>
            </div>

            <div className={styles.editFormContainer}>
                <div className={styles.form}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="editCampus">Select Campus:</label>
                            <select id="editCampus">
                                <option value="main">Main Campus</option>
                                <option value="trece">Trece Campus</option>
                                <option value="naic">Naic Campus</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="editSports">Select Sports:</label>
                            <select id="editSports">
                                <option value="basketball">Basketball</option>
                                <option value="volleyball">Volleyball</option>
                                <option value="soccer">Soccer</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="editSurname">Select Surname:</label>
                            <select id="editSurname">
                                <option value="surname1">Surname 1</option>
                                <option value="surname2">Surname 2</option>
                                <option value="surname3">Surname 3</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="editCollege">Select College:</label>
                            <select id="editCollege">
                                <option value="engineering">College of Engineering</option>
                                <option value="technology">College of Technology</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.formContainer}>
                <div className={styles.form}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" placeholder="Enter Last Name" />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" placeholder="Enter First Name" />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="middleInitial">Middle Initial:</label>
                            <input type="text" id="middleInitial" placeholder="Optional" />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="age">Age:</label>
                            <input type="number" id="age" placeholder="Enter Age" />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="picture">2x2 Picture:</label>
                            <input type="file" id="picture" />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="jerseyNumber">Jersey Number:</label>
                            <input type="text" id="jerseyNumber" placeholder="Enter Jersey Number" />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="sports">Sports:</label>
                            <select id="sports">
                                <option value="basketball">Basketball</option>
                                <option value="volleyball">Volleyball</option>
                                <option value="soccer">Soccer</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="college">College:</label>
                            <select id="college">
                                <option value="engineering">College of Engineering</option>
                                <option value="technology">College of Technology</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.formButtons}>
                        <button type="button" className={styles.cancelBtn}>Cancel</button>
                        <button type="submit" className={styles.addBtn}>Apply Changes</button>
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

export default PlayerInfoEdit;

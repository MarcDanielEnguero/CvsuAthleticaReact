import React, { useState } from 'react';
import Navbar from '../Navbar';  // Assuming you have a pre-made Navbar component
import styles from './PlayerInfoAdd.module.css'; // Import the CSS module

const PlayerInfoAdd = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleInitial: '',
    age: '',
    picture: null,
    jerseyNumber: '',
    sports: 'basketball',
    campus: 'main',
    college: 'engineering',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input changes (for picture)
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0],
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., make API call)
    console.log(formData);
  };

  return (
    <div className={styles.container}>
      <Navbar /> {/* Import your existing Navbar component */}

      <div className={styles.headerRow}>
        <h2 className={styles.formTitle}>ADD PLAYER PROFILE</h2>
        <div className={styles.dropdowns}>
          <select
            id="campus"
            name="campus"
            value={formData.campus}
            onChange={handleChange}
          >
            <option value="main">Main Campus</option>
            <option value="trece">Trece Campus</option>
            <option value="naic">Naic Campus</option>
            {/* ADD MORE AS NEEDED */}
          </select>
        </div>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="middleInitial">Middle Initial:</label>
              <input
                type="text"
                id="middleInitial"
                name="middleInitial"
                value={formData.middleInitial}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter Age"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="picture">2x2 Picture:</label>
              <input
                type="file"
                id="picture"
                name="picture"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="jerseyNumber">Jersey Number:</label>
              <input
                type="text"
                id="jerseyNumber"
                name="jerseyNumber"
                value={formData.jerseyNumber}
                onChange={handleChange}
                placeholder="Enter Jersey Number"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="sports">Sports:</label>
              <select
                id="sports"
                name="sports"
                value={formData.sports}
                onChange={handleChange}
              >
                <option value="basketball">Basketball</option>
                <option value="volleyball">Volleyball</option>
                <option value="soccer">Soccer</option>
                {/* ADD MORE */}
              </select>
            </div>

            {/* FOR MAIN CAMPUS ONLY */}
            {formData.campus === 'main' && (
              <div className={styles.formGroup}>
                <label htmlFor="college">College:</label>
                <select
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                >
                  <option value="engineering">College of Engineering</option>
                  <option value="technology">College of Technology</option>
                  {/* ADD MORE */}
                </select>
              </div>
            )}
          </div>
          <div className={styles.formButtons}>
            <button type="button" className={styles.cancelBtn}>Cancel</button>
            <button type="submit" className={styles.addBtn}>Add</button>
          </div>
        </form>
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

export default PlayerInfoAdd;

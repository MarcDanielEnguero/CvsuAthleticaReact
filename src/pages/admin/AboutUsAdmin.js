import React, { useState, useEffect } from 'react';
import styles from './AboutUsAdmin.module.css';
import historicalBackground from '../../assets/img/AboutUs/historical.png';
import coachPicture from '../../assets/img/coach.png';

const AboutUsAdmin = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [coachProfiles, setCoachProfiles] = useState(() => {
    // Try to load from localStorage first
    const savedProfiles = localStorage.getItem('coachProfiles');
    return savedProfiles ? JSON.parse(savedProfiles) : [
      {
        id: 1,
        name: "Marco C. Dalanon",
        role: "BASKETBALL & SCAMMER COACH",
        email: "marco.dalanon@cvsu.edu.ph",
        contact: "09363625388",
        image: coachPicture,
      },
      {
        id: 2,
        name: "Elreen Aya De Guzman",
        role: "TENNIS COACH",
        email: "elreen.aya.deguzman@cvsu.edu.ph",
        contact: "09155334879",
        image: coachPicture,
      },
      {
        id: 3,
        name: "Elreen Aya De Guzman",
        role: "SOCCER, SWIMMING COACH",
        email: "elreen.aya.deguzman@cvsu.edu.ph",
        contact: "09155334879",
        image: coachPicture,
      }
    ];
  });

  // Update localStorage whenever coachProfiles change
  useEffect(() => {
    localStorage.setItem('coachProfiles', JSON.stringify(coachProfiles));
  }, [coachProfiles]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (id, field, value) => {
    setCoachProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === id ? { ...profile, [field]: value } : profile
      )
    );
  };

  const handleImageChange = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setCoachProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === id ? { ...profile, image: imageURL } : profile
        )
      );
    }
  };

  const handleSave = () => {
    fetch("http://localhost:5000/coaches", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coachProfiles),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Save failed');
        return res.json();
      })
      .then((data) => {
        console.log("Saved successfully", data);
        setIsEditing(false);
        // Ensure localStorage is updated
        localStorage.setItem('coachProfiles', JSON.stringify(coachProfiles));
      })
      .catch((err) => {
        console.error("Error saving data:", err);
        alert("Failed to save changes to server. Local changes will be preserved.");
      });
  };

  return (
    <>
      <div className={styles.bannerSection}></div>

      <div className={styles.historicalSection}>
        <h2>HISTORICAL BACKGROUND</h2>
        <div className={styles.historicalContent}>
          <div className={styles.historicalText}>
            <p>
              IN 1998, THE FORMER DON SEVERINO AGRICULTURAL COLLEGE WAS
              CONVERTED INTO A STATE UNIVERSITY BY VIRTUE OF REPUBLIC ACT NO.
              8468. THIS IMPORTANT EVENT HAPPENED ON JANUARY 22, 1998, HENCE THE
              CAVITE STATE UNIVERSITY.
            </p>
            <p>
              IN THE FIRST SEMESTER OF SCHOOL YEAR 1998-1999, THE DEPARTMENT OF
              PHYSICAL EDUCATION AND RECREATION UNDER THE SCHOOL OF EDUCATION
              WAS ELEVATED INTO A COLLEGE. IT WAS CONCEIVED TO PROVIDE THE
              STUDENTS ADEQUATE OPPORTUNITIES TO CONTINUOUSLY PARTICIPATE IN A
              DEVELOPMENT PROGRAM OF PHYSICAL ACTIVITIES WHICH ARE HELPFUL,
              INTELLECTUALLY INVIGORATING, MORALLY UPLIFTING, SOCIALLY
              INSIGNIFICANT, CULTURALLY ENHANCING, ENVIRONMENT ORIENTED AND TO
              PRODUCE COMPETENT MANPOWER TO ASSIST IN THE PREPARATION AND
              IMPLEMENTATION OF PROGRAMS IN PHYSICAL EDUCATION, SPORTS AND
              RECREATION.
            </p>
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
            The College of Sports, Physical Education, and Recreation shall
            provide leadership; formulate policies and set priorities and
            directions in the promotion and development of all amateur sports
            in Southern Tagalog Region. This will involve all provincial
            training institutes, other state universities and colleges, and
            interested public and private institutions in the region.
          </p>
        </div>
        <div className={styles.valuesCard}>
          <h3 className={styles.valuesTitle}>COLLEGE MISSION</h3>
          <p className={styles.valuesDetails}>
            The task of the College of Sports, Physical Education and
            Recreation is to provide undergraduate and advanced instruction in
            Physical Education and Recreation sciences. It strives to develop
            persons committed to the pursuit of excellence in Physical Education
            and Recreation studies who are able to translate into action
            concepts and values necessary to improve the quality of life of the
            Filipino. It also aims to promote Physical Education, sports, and
            recreation among the studentry and other constituents of the
            university.
          </p>
        </div>
      </div>

      <button className={styles.editButton} onClick={handleEditToggle}>
        {isEditing ? "Finish Editing" : "Edit Coaches"}
      </button>

      <div className={styles.coachTitle}>
        <h2>COACHES</h2>
      </div>
      <div className={styles.coachGridContainer}>
        {coachProfiles.map((coach) => (
          <div className={styles.coachCard} key={coach.id}>
            {isEditing ? (
              <>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(coach.id, e)}
                />
                <img src={coach.image} alt={coach.name} />
                <input
                  type="text"
                  value={coach.name}
                  onChange={(e) =>
                    handleInputChange(coach.id, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  value={coach.role}
                  onChange={(e) =>
                    handleInputChange(coach.id, "role", e.target.value)
                  }
                />
                <input
                  type="email"
                  value={coach.email}
                  onChange={(e) =>
                    handleInputChange(coach.id, "email", e.target.value)
                  }
                />
                <input
                  type="text"
                  value={coach.contact}
                  onChange={(e) =>
                    handleInputChange(coach.id, "contact", e.target.value)
                  }
                />
              </>
            ) : (
              <>
                <img src={coach.image} alt={coach.name} />
                <h3>{coach.name}</h3>
                <p>{coach.role}</p>
                <p>{coach.email}</p>
                <p>{coach.contact}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <button className={styles.saveButton} onClick={handleSave}>
          Save Changes
        </button>
      )}
    </>
  );
};

export default AboutUsAdmin;
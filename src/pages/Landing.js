import React, { useState, useEffect } from 'react';
import styles from './Landing.module.css';
import Navbar from './Navbar';

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    "/api/placeholder/1200/400",
    "/api/placeholder/1200/400",
    "/api/placeholder/1200/400"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.appContainer}>
      <Navbar />
      
      {/* Banner Section */}
      <div className={styles.banner}>
        <div 
          className={styles.bannerSlide}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className={styles.bannerDots}>
          {bannerImages.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        <div className={styles.bannerOverlay} />

        <div className={styles.bannerContent}>
          <div className={styles.bannerText}>
            <h1 className={styles.beA}>BE A</h1>
            <h1 className={styles.champion}>CHAMPION</h1>
          </div>
          <img
            src="/api/placeholder/420/420"
            alt="Bee Logo"
            className={styles.beeLogo}
          />
        </div>
      </div>

      {/* Tutorial Section */}
      <div className={styles.tutorialSection}>
        <h2>DON'T KNOW HOW TO USE CVSU ATHLETICA?</h2>
        
        <div className={styles.tutorialContent}>
          <div className={styles.tutorialText}>
            <p className={styles.introText}>
              Just Watch This Video And We Will Teach You How To Use The Cvsu Athletica Website
            </p>
            <h3>WHAT IS CVSU ATHLETICA?</h3>
            <p className={styles.descriptionText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
          
          <div className={styles.videoBox}>
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="YouTube video player" 
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      </div>

      {/* Motto Section */}
      <div className={styles.motto}>
        <h1>BE AN ATHLETE AND FIGHT WITH PRIDE!!</h1>
      </div>

      {/* News Section */}
      <div className={styles.title1}>
        <h1>ANNOUNCEMENTS</h1>
      </div>
      
      <div className={styles.newsSection}>
        <div className={styles.newsContent}>
          <div className={styles.newsText}>
            <h3>CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024</h3>
            <p>Lorem ipsum is simply dummy text of the printing and typesetting industry...</p>
          </div>
          <div className={styles.newsImage}>
            <img src="/api/placeholder/400/300" alt="News" />
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className={styles.title3}>
        <h1>EVENTS AND GAME SCHEDULE</h1>
      </div>
      
      <div className={styles.eventContainer}>
        <div className={styles.eventOpeningWrapper}>
          <h2 className={styles.eventOpening}>STRASUC 2024</h2>
        </div>
        
        <div className={styles.eventCardsWrapper}>
          {['Opening', 'Taekwondo', 'Basketball'].map((sport) => (
            <div key={sport} className={styles.eventCard}>
              <div className={styles.eventTitle}>{sport}</div>
              <div className={styles.eventDetails}>
                <p><span>Date:</span> November 00, 0000</p>
                <p><span>Time:</span> 00:00 PM</p>
                <p><span>Place:</span> Palawan State University, Gymnasium</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
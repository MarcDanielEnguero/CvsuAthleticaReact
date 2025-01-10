import React from 'react';
import './Landing.css'; // Assuming CSS is managed in an external file

const Banner = () => (
  <div className="banner">
    <div className="banner-slide">
      <img src="./pics/banner1.png" alt="Slide 1" />
      <img src="./pics/banner2.png" alt="Slide 2" />
      <img src="./pics/banner3.png" alt="Slide 3" />
    </div>
    <div className="banner-dots">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
    <div className="banner-content">
      <div className="banner-text">
        <h1 className="be-a">BE A</h1>
        <h1 className="champion">CHAMPION</h1>
      </div>
      <img src="./pics/bee-logo.png" className="bee-logo" alt="Logo" />
    </div>
  </div>
);

const TutorialSection = () => (
  <div className="tutorial-section">
    <h2>DON'T KNOW HOW TO USE CVSU ATHLETICA?</h2>
    <div className="tutorial-content">
      <div className="tutorial-text">
        <p className="intro-text">Just Watch This Video And We Will Teach You How To Use The Cvsu Athletica Website</p>
        <h3>WHAT IS CVSU ATHLETICA?</h3>
        <p className="description-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
      </div>
      <div className="video-box">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </div>
);

const NewsSection = () => (
  <div className="news-section">
    <div className="news-content">
      <div className="news-text">
        <h3>CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024</h3>
        <p>Lorem ipsum is simply dummy text of the printing and typesetting industry...</p>
      </div>
      <div className="news-image">
        <img src="./pics/news.png" alt="Athlete in Action" />
      </div>
    </div>
  </div>
);

const EventCard = ({ title, date, time, place }) => (
  <div className="event-card">
    <div className="event-title">{title}</div>
    <div className="event-details">
      <p><span>Date:</span> {date}</p>
      <p><span>Time:</span> {time}</p>
      <p><span>Place:</span> {place}</p>
    </div>
  </div>
);

const EventSection = () => (
  <div className="event-container">
    <div className="event-opening-wrapper">
      <h2 className="event-opening">STRASUC 2024</h2>
    </div>
    <div className="event-cards-wrapper">
      <EventCard title="Opening" date="November 00, 0000" time="00:00 PM" place="Palawan State University, Gymnasium" />
      <EventCard title="Taekwondo" date="November 00, 0000" time="00:00 PM" place="Palawan State University, Gymnasium" />
      <EventCard title="Basketball" date="November 00, 0000" time="00:00 PM" place="Palawan State University, Gymnasium" />
    </div>
  </div>
);

const TryoutCard = ({ title, date, time, place }) => (
  <div className="tryout-card">
    <div className="tryout-title">{title}</div>
    <div className="tryout-details">
      <p><span>Date:</span> {date}</p>
      <p><span>Time:</span> {time}</p>
      <p><span>Place:</span> {place}</p>
      <button className="apply-btn">Apply</button>
    </div>
  </div>
);

const TryoutSection = () => (
  <div className="tryout-container">
    <div className="tryout-opening-wrapper">
      <h2 className="tryout-opening">CEIT U-GAMES TRYOUTS</h2>
    </div>
    <div className="tryout-cards-wrapper">
      <TryoutCard title="Opening" date="November 00, 0000" time="00:00 PM" place="Palawan State University, Gymnasium" />
      <TryoutCard title="Taekwondo" date="November 00, 0000" time="00:00 PM" place="Palawan State University, Gymnasium" />
      <TryoutCard title="Basketball" date="November 00, 0000" time="00:00 PM" place="Palawan State University, Gymnasium" />
    </div>
  </div>
);

const Footer = () => (
  <div className="footer-bar">
    <div className="email-contact">
      <i className="fa fa-envelope"></i> email1@periodt.com
    </div>
    <div className="email-contact">
      <i className="fa fa-envelope"></i> email2@periodt.com
    </div>
  </div>
);

const Landing = () => (
  <div>
    <Banner />
    <TutorialSection />
    <div className="motto">
      <h1>BE AN ATHLETE AND FIGHT WITH PRIDE!!</h1>
    </div>
    <div className="title1">
      <h1>ANNOUNCEMENTS</h1>
    </div>
    <NewsSection />
    <div className="title2">
      <h1>LATEST EVENTS AND ACHIEVEMENTS</h1>
    </div>
    <NewsSection />
    <div className="title3">
      <h1>EVENTS AND GAME SCHEDULE</h1>
    </div>
    <EventSection />
    <div className="title4">
      <h1>TRYOUTS AND TRAINING</h1>
    </div>
    <TryoutSection />
    <Footer />
  </div>
);

export default Landing;

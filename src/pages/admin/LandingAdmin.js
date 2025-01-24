import React, { useEffect } from "react";
import Navbar from "./Navbar"; // Import the existing Navbar component
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Landing.css"; // Import your styles for the Landing page
import beeLogo from '../assets/img/bee-logo.png';
import banner1 from '../assets/img/banner1.png';
import banner2 from '../assets/img/banner2.png';
import banner3 from '../assets/img/banner3.png';
import news from '../assets/img/news.png';

const Landing = () => {

  const navigate = useNavigate(); // Initialize useNavigate
  useEffect(() => {
    // Banner slider logic
    const slidesContainer = document.querySelector(".banner-slide");
    const slides = document.querySelectorAll(".banner-slide img");
    const dots = document.querySelectorAll(".banner-dots .dot");
    let currentSlide = 0;

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
      updateDots();
    }

    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
      });
    }

    const slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    updateDots();

    return () => {
      clearInterval(slideInterval); // Cleanup interval on component unmount
    };
  }, []);

  return (
    <div className="landing">
      <div className="banner">
        <div className="banner-slide">
          <img src={banner1} alt="Slide 1" className="fade-in" />
          <img src={banner2} alt="Slide 2" className="fade-in" />
          <img src={banner3} alt="Slide 3" className="fade-in" />
        </div>
        <div className="banner-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="banner-content">
          <div className="banner-text">
            <h1 className="be-a slide-up">BE A</h1>
            <h1 className="champion slide-up">CHAMPION</h1>
          </div>
          <img src={beeLogo} className="bee-logo fade-in" alt="Bee Logo" />
        </div>
      </div>

      <div className="tutorial-section">
        <h2 className="slide-up">DON'T KNOW HOW TO USE CVSU ATHLETICA?</h2>
        <div className="tutorial-content">
          <div className="tutorial-text fade-in">
            <p className="intro-text">Just Watch This Video And We Will Teach You How To Use The Cvsu Athletica Website</p>
            <h3>WHAT IS CVSU ATHLETICA?</h3>
            <p className="description-text">
              <span>CvSU Athletica</span> is a dedicated webpage designed for Cavite State University (CvSU) students and sports enthusiasts. It serves as the central hub for tryout schedules, game updates, and announcements about various sports events. Created to highlight and give proper recognition to university sports, CvSU Athletica ensures these activities are not overshadowed by other social media platforms. This platform keeps students informed and engaged, fostering a stronger sense of community within CvSU's athletic programs.
            </p>
          </div>
          <div className="video-box fade-in">
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

      <div className="motto">
        <h1 className="slide-up">BE AN ATHLETE AND FIGHT WITH PRIDE!!</h1>
      </div>

      <div className="title1">
        <h1 className="slide-up">ANNOUNCEMENTS</h1>
      </div>
      <div className="news-section">
        <div className="news-content fade-in">
          <div className="news-text">
            <h3>CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024</h3>
            <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </div>
          <div className="news-image">
            <img src={news} alt="Athlete in Action" />
          </div>
        </div>
      </div>

      <div className="title2">
        <h1 className="slide-up">LATEST EVENTS AND ACHIEVEMENTS</h1>
      </div>
      <div className="third-section">
        <div className="third-content fade-in">
          <div className="third-image">
            <img src={news} alt="Uploaded Photo" />
          </div>
          <div className="third-text">
            <h3>CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024</h3>
            <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </div>
        </div>
      </div>

      <div className="title3">
        <h1 className="slide-up">EVENTS AND GAME SCHEDULE</h1>
      </div>
      <div className="event-container fade-in">
        <div className="event-opening-wrapper">
          <h2 className="event-opening">STRASUC 2024</h2>
        </div>
        <div className="event-cards-wrapper">
          <div className="event-card">
            <div className="event-title">Opening</div>
            <div className="event-details">
              <p><span>Date:</span> November 00, 0000</p>
              <p><span>Time:</span> 00:00 PM</p>
              <p><span>Place:</span> Palawan State University, Gymnasium</p>
            </div>
          </div>

          <div className="event-card">
            <div className="event-title">Taekwondo</div>
            <div className="event-details">
              <p><span>Date:</span> November 00, 0000</p>
              <p><span>Time:</span> 00:00 PM</p>
              <p><span>Place:</span> Palawan State University, Gymnasium</p>
            </div>
          </div>

          <div className="event-card">
            <div className="event-title">Basketball</div>
            <div className="event-details">
              <p><span>Date:</span> November 00, 0000</p>
              <p><span>Time:</span> 00:00 PM</p>
              <p><span>Place:</span> Palawan State University, Gymnasium</p>
            </div>
          </div>
        </div>
      </div>

      <div className="title4">
        <h1 className="slide-up">TRYOUTS AND TRAINING</h1>
      </div>
      <div className="tryout-container fade-in">
        <div className="tryout-opening-wrapper">
          <h2 className="tryout-opening">CEIT U-GAMES TRYOUTS</h2>
        </div>
        <div className="tryout-cards-wrapper">
          <div className="tryout-card">
            <div className="tryout-title">Opening</div>
            <div className="tryout-details">
              <p><span>Date:</span> November 00, 0000</p>
              <p><span>Time:</span> 00:00 PM</p>
              <p><span>Place:</span> Palawan State University, Gymnasium</p>
              <button
                  className="apply-btn"
                  onClick={() => navigate("/free-training-form")}
                >
                  Apply Now
                </button>
            </div>
          </div>

          <div className="tryout-card">
            <div className="tryout-title">Taekwondo</div>
            <div className="tryout-details">
              <p><span>Date:</span> November 00, 0000</p>
              <p><span>Time:</span> 00:00 PM</p>
              <p><span>Place:</span> Palawan State University, Gymnasium</p>
              <button
                  className="apply-btn"
                  onClick={() => navigate("/free-training-form")}
                >
                  Apply Now
                </button>
            </div>
          </div>

          <div className="tryout-card">
            <div className="tryout-title">Basketball</div>
            <div className="tryout-details">
              <p><span>Date:</span> November 00, 0000</p>
              <p><span>Time:</span> 00:00 PM</p>
              <p><span>Place:</span> Palawan State University, Gymnasium</p>
              <button
                  className="apply-btn"
                  onClick={() => navigate("/free-training-form")}
                >
                  Apply Now
                </button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="email-contact">
          <i className="fa fa-envelope"></i> email1@periodt.com
        </div>
        <div className="email-contact">
          <i className="fa fa-envelope"></i> email2@periodt.com
        </div>
      </div>
    </div>
  );
};

export default Landing;

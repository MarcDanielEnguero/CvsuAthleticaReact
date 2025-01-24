<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import "./LandingAdmin.module.css";
import beeLogo from '../../assets/img/bee-logo.png';
import banner1 from '../../assets/img/banner1.png';
import banner2 from '../../assets/img/banner2.png';
import banner3 from '../../assets/img/banner3.png';

const LandingAdmin = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState({
    newsTitle: "CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024",
    newsText: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
    newsImage: "",
    thirdTitle: "CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024",
    thirdText: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
    thirdImage: "",
    eventCards: [
      { 
        title: "Opening", 
        details: "<p><span>Date:</span> November 00, 0000</p><p><span>Time:</span> 00:00 PM</p><p><span>Place:</span> Palawan State University, Gymnasium" 
      }
    ],
    tryoutCards: [
      { 
        title: "Opening", 
        details: "<p><span>Date:</span> November 00, 0000</p><p><span>Time:</span> 00:00 PM</p><p><span>Place:</span> Palawan State University, Gymnasium" 
      }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
=======
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
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)

=======
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

>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
  const navigate = useNavigate(); // Initialize useNavigate
  useEffect(() => {
    // Banner slider logic
    const slidesContainer = document.querySelector(".banner-slide");
    const slides = document.querySelectorAll(".banner-slide img");
    const dots = document.querySelectorAll(".banner-dots .dot");
    let currentSlide = 0;
<<<<<<< HEAD

<<<<<<< HEAD
  useEffect(() => {
    fetchLandingContent();
  }, []);

  const fetchLandingContent = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/landing', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Use existing content as default if backend returns empty
      setEditableContent(prevContent => ({
        ...prevContent,
        ...response.data
      }));
      
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch landing content');
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.put('http://localhost:5000/api/landing', editableContent, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setIsEditing(false);
      fetchLandingContent();
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save changes');
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableContent({ ...editableContent, [name]: value });
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditableContent(prevContent => ({
          ...prevContent, 
          [field]: reader.result
        }));
      };
      reader.readAsDataURL(file);
=======
=======

>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
      updateDots();
<<<<<<< HEAD
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
=======
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
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
<<<<<<< HEAD

  const handleDeleteCard = (type, index) => {
    const updatedCards = editableContent[type].filter((_, i) => i !== index);
    setEditableContent({ ...editableContent, [type]: updatedCards });
  };
=======
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

<<<<<<< HEAD
<<<<<<< HEAD
      <button 
        className="addBtn" 
        onClick={isEditing ? handleSaveChanges : handleEditClick}
      >
        {isEditing ? "Save Changes" : "Edit Content"}
      </button>
=======
=======
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
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
<<<<<<< HEAD
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
=======
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)

      <div className="title1">
        <h1 className="slide-up">ANNOUNCEMENTS</h1>
      </div>
      <div className="news-section">
        <div className="news-content fade-in">
          <div className="news-text">
<<<<<<< HEAD
<<<<<<< HEAD
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="newsTitle"
                  value={editableContent.newsTitle}
                  onChange={handleChange}
                  placeholder="News Title"
                />
                <textarea
                  name="newsText"
                  value={editableContent.newsText}
                  onChange={handleChange}
                  placeholder="News Description"
                />
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, "newsImage")}
                />
              </>
            ) : (
              <>
                <h3>{editableContent.newsTitle}</h3>
                <p>{editableContent.newsText}</p>
              </>
            )}
          </div>
          {(editableContent.newsImage || isEditing) && (
            <div className="news-image">
              <img 
                src={editableContent.newsImage || banner1} 
                alt="Athlete in Action" 
              />
            </div>
          )}
=======
            <h3>CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024</h3>
            <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </div>
          <div className="news-image">
            <img src={news} alt="Athlete in Action" />
          </div>
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
=======
            <h3>CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024</h3>
            <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </div>
          <div className="news-image">
            <img src={news} alt="Athlete in Action" />
          </div>
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
        </div>
      </div>

      {/* Similar rendering pattern for other sections */}
      <div className="title2">
        <h1 className="slide-up">LATEST EVENTS AND ACHIEVEMENTS</h1>
      </div>
      <div className="third-section">
        <div className="third-content fade-in">
<<<<<<< HEAD
<<<<<<< HEAD
          <div className="third-text">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="thirdTitle"
                  value={editableContent.thirdTitle}
                  onChange={handleChange}
                  placeholder="Third Section Title"
                />
                <textarea
                  name="thirdText"
                  value={editableContent.thirdText}
                  onChange={handleChange}
                  placeholder="Third Section Description"
                />
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, "thirdImage")}
                />
              </>
            ) : (
              <>
                <h3>{editableContent.thirdTitle}</h3>
                <p>{editableContent.thirdText}</p>
              </>
            )}
          </div>
          {(editableContent.thirdImage || isEditing) && (
            <div className="third-image">
              <img 
                src={editableContent.thirdImage || banner2} 
                alt="Uploaded Photo" 
              />
            </div>
          )}
=======
          <div className="third-image">
            <img src={news} alt="Uploaded Photo" />
          </div>
          <div className="third-text">
            <h3>CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024</h3>
            <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </div>
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
=======
          <div className="third-image">
            <img src={news} alt="Uploaded Photo" />
          </div>
          <div className="third-text">
            <h3>CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024</h3>
            <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </div>
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
        </div>
      </div>

      {/* Events Section */}
      <div className="title3">
        <h1 className="slide-up">EVENTS AND GAME SCHEDULE</h1>
      </div>
      <div className="event-container fade-in">
        <div className="event-opening-wrapper">
          <h2 className="event-opening">STRASUC 2024</h2>
        </div>
        <div className="event-cards-wrapper">
<<<<<<< HEAD
<<<<<<< HEAD
          {editableContent.eventCards.map((card, index) => (
            <div className="event-card" key={index}>
              <div className="event-title">
                {isEditing ? (
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) =>
                      updateCardDetails("eventCards", index, "title", e.target.value)
                    }
                  />
                ) : (
                  card.title
                )}
              </div>
              <div className="event-details">
                {isEditing ? (
                  <>
                    <textarea
                      value={card.details}
                      onChange={(e) =>
                        updateCardDetails("eventCards", index, "details", e.target.value)
                      }
                    />
                    <button onClick={() => handleDeleteCard("eventCards", index)}>
                      Delete Card
                    </button>
                  </>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: card.details }} />
                )}
              </div>
=======
=======
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
          <div className="event-card">
            <div className="event-title">Opening</div>
            <div className="event-details">
              <p><span>Date:</span> November 00, 0000</p>
              <p><span>Time:</span> 00:00 PM</p>
              <p><span>Place:</span> Palawan State University, Gymnasium</p>
<<<<<<< HEAD
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
=======
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
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

      {/* Tryouts Section */}
      <div className="title4">
        <h1 className="slide-up">TRYOUTS AND TRAINING</h1>
      </div>
      <div className="tryout-container fade-in">
        <div className="tryout-opening-wrapper">
          <h2 className="tryout-opening">CEIT U-GAMES TRYOUTS</h2>
        </div>
        <div className="tryout-cards-wrapper">
<<<<<<< HEAD
<<<<<<< HEAD
          {editableContent.tryoutCards.map((card, index) => (
            <div className="tryout-card" key={index}>
              <div className="tryout-title">
                {isEditing ? (
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) =>
                      updateCardDetails("tryoutCards", index, "title", e.target.value)
                    }
                  />
                ) : (
                  card.title
                )}
              </div>
              <div className="tryout-details">
                {isEditing ? (
                  <>
                    <textarea
                      value={card.details}
                      onChange={(e) =>
                        updateCardDetails("tryoutCards", index, "details", e.target.value)
                      }
                    />
                    <button onClick={() => handleDeleteCard("tryoutCards", index)}>
                      Delete Card
                    </button>
                  </>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: card.details }} />
                )}
              </div>
=======
=======
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
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
<<<<<<< HEAD
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
=======
>>>>>>> parent of a3b714e (Working LandingAdmin not backend yet)
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

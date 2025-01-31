import React, { useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import "./LandingAdmin.module.css";
import beeLogo from '../../assets/img/bee-logo.png';
import banner1 from '../../assets/img/banner1.png';
import banner2 from '../../assets/img/banner2.png';
import banner3 from '../../assets/img/banner3.png';
import news from '../../assets/img/news.png';

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

  const navigate = useNavigate();

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
    }
  };

  const addCard = (type) => {
    const newCard = { 
      title: "New Title", 
      details: "<p><span>Date:</span> New Date</p><p><span>Time:</span> New Time</p><p><span>Place:</span> New Place" 
    };
    setEditableContent({
      ...editableContent,
      [type]: [...editableContent[type], newCard]
    });
  };

  const updateCardDetails = (type, index, field, value) => {
    const updatedCards = editableContent[type].map((card, i) =>
      i === index ? { ...card, [field]: value } : card
    );
    setEditableContent({ ...editableContent, [type]: updatedCards });
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f8f9fa',
    transition: 'border-color 0.3s'
  };

  const textareaStyles = {
    ...inputStyles,
    minHeight: '100px',
    resize: 'vertical'
  };

  return (
    <div className="landing">
      <Navbar />
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

      <button 
        className="edit-button"
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          margin: '20px auto',
          transition: 'background-color 0.3s',
          display: 'block',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        onClick={handleEditClick}
      >
        {isEditing ? "Save Changes" : "Edit Content"}
      </button>

      <div className="title1">
        <h1 className="slide-up">ANNOUNCEMENTS</h1>
      </div>
      <div className="news-section">
        <div className="news-content fade-in">
          <div className="news-text">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="newsTitle"
                  value={editableContent.newsTitle}
                  onChange={handleChange}
                  style={inputStyles}
                  onFocus={(e) => e.target.style.borderColor = '#007bff'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                <textarea
                  name="newsText"
                  value={editableContent.newsText}
                  onChange={handleChange}
                  style={textareaStyles}
                  onFocus={(e) => e.target.style.borderColor = '#007bff'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, "newsImage")}
                  style={inputStyles}
                />
              </>
            ) : (
              <>
                <h3>{editableContent.newsTitle}</h3>
                <p>{editableContent.newsText}</p>
              </>
            )}
          </div>
          {editableContent.newsImage && (
            <div className="news-image">
              <img src={editableContent.newsImage} alt="Athlete in Action" />
            </div>
          )}
        </div>
      </div>

      <div className="title2">
        <h1 className="slide-up">LATEST EVENTS AND ACHIEVEMENTS</h1>
      </div>
      <div className="third-section">
        <div className="third-content fade-in">
          <div className="third-text">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="thirdTitle"
                  value={editableContent.thirdTitle}
                  onChange={handleChange}
                  style={inputStyles}
                  onFocus={(e) => e.target.style.borderColor = '#007bff'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                <textarea
                  name="thirdText"
                  value={editableContent.thirdText}
                  onChange={handleChange}
                  style={textareaStyles}
                  onFocus={(e) => e.target.style.borderColor = '#007bff'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, "thirdImage")}
                  style={inputStyles}
                />
              </>
            ) : (
              <>
                <h3>{editableContent.thirdTitle}</h3>
                <p>{editableContent.thirdText}</p>
              </>
            )}
          </div>
          {editableContent.thirdImage && (
            <div className="third-image">
              <img src={editableContent.thirdImage} alt="Uploaded Photo" />
            </div>
          )}
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
                    style={inputStyles}
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                ) : (
                  card.title
                )}
              </div>
              <div className="event-details">
                {isEditing ? (
                  <textarea
                    value={card.details}
                    onChange={(e) =>
                      updateCardDetails("eventCards", index, "details", e.target.value)
                    }
                    style={textareaStyles}
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: card.details }} />
                )}
              </div>
            </div>
          ))}
          {isEditing && (
            <button 
              className="add-card-btn" 
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '10px 0',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              onClick={() => addCard("eventCards")}
            >
              Add Event Card
            </button>
          )}
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
                    style={inputStyles}
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                ) : (
                  card.title
                )}
              </div>
              <div className="tryout-details">
                {isEditing ? (
                  <textarea
                    value={card.details}
                    onChange={(e) =>
                      updateCardDetails("tryoutCards", index, "details", e.target.value)
                    }
                    style={textareaStyles}
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: card.details }} />
                )}
              </div>
            </div>
          ))}
          {isEditing && (
            <button 
              className="add-card-btn"
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '10px 0',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              onClick={() => addCard("tryoutCards")}
            >
              Add Tryout Card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingAdmin;
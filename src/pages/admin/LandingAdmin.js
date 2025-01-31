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
  const navigate = useNavigate();

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

  const handleEditClick = () => setIsEditing(!isEditing);

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

  const updateCardDetails = (type, index, field, value) => {
    const updatedCards = editableContent[type].map((card, i) => 
      i === index ? { ...card, [field]: value } : card
    );
    setEditableContent({ ...editableContent, [type]: updatedCards });
  };

  const handleDeleteCard = (type, index) => {
    const updatedCards = editableContent[type].filter((_, i) => i !== index);
    setEditableContent({ ...editableContent, [type]: updatedCards });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="landing">
      <Navbar />
      {/* Banner Section */}
      <div className="banner">
        <div className="banner-slide">
          <img src={banner1} alt="Slide 1" className="fade-in" />
          <img src={banner2} alt="Slide 2" className="fade-in" />
          <img src={banner3} alt="Slide 3" className="fade-in" />
        </div>
        <div className="banner-content">
          <div className="banner-text">
            <h1 className="be-a slide-up">BE A</h1>
            <h1 className="champion slide-up">CHAMPION</h1>
          </div>
          <img src={beeLogo} className="bee-logo fade-in" alt="Bee Logo" />
        </div>
      </div>

      <button className="addBtn" onClick={isEditing ? handleSaveChanges : handleEditClick}>
        {isEditing ? "Save Changes" : "Edit Content"}
      </button>

      {/* News Section */}
      <div className="title1">
        <h1 className="slide-up">ANNOUNCEMENTS</h1>
      </div>
      <div className="news-section">
        <div className="news-content fade-in">
          <div className="news-text">
            {isEditing ? (
              <>
                <input type="text" name="newsTitle" value={editableContent.newsTitle} onChange={handleChange} />
                <textarea name="newsText" value={editableContent.newsText} onChange={handleChange} />
                <input type="file" onChange={(e) => handleImageUpload(e, "newsImage")} />
              </>
            ) : (
              <>
                <h3>{editableContent.newsTitle}</h3>
                <p>{editableContent.newsText}</p>
              </>
            )}
          </div>
          <div className="news-image">
            <img src={editableContent.newsImage || banner1} alt="News" />
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="title3">
        <h1 className="slide-up">EVENTS AND GAME SCHEDULE</h1>
      </div>
      <div className="event-container fade-in">
        <div className="event-cards-wrapper">
          {editableContent.eventCards.map((card, index) => (
            <div className="event-card" key={index}>
              <div className="event-title">
                {isEditing ? (
                  <input
                    value={card.title}
                    onChange={(e) => updateCardDetails("eventCards", index, "title", e.target.value)}
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
                      onChange={(e) => updateCardDetails("eventCards", index, "details", e.target.value)}
                    />
                    <button onClick={() => handleDeleteCard("eventCards", index)}>Delete</button>
                  </>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: card.details }} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tryouts Section */}
      <div className="title4">
        <h1 className="slide-up">TRYOUTS AND TRAINING</h1>
      </div>
      <div className="tryout-container fade-in">
        <div className="tryout-cards-wrapper">
          {editableContent.tryoutCards.map((card, index) => (
            <div className="tryout-card" key={index}>
              <div className="tryout-title">
                {isEditing ? (
                  <input
                    value={card.title}
                    onChange={(e) => updateCardDetails("tryoutCards", index, "title", e.target.value)}
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
                      onChange={(e) => updateCardDetails("tryoutCards", index, "details", e.target.value)}
                    />
                    <button onClick={() => handleDeleteCard("tryoutCards", index)}>Delete</button>
                  </>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: card.details }} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingAdmin;
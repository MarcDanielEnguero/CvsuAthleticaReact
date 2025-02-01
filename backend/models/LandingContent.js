const mongoose = require('mongoose');

const LandingContentSchema = new mongoose.Schema({
  newsTitle: { type: String, default: "CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024" },
  newsText: { type: String, default: "Lorem ipsum is simply dummy text..." },
  newsImage: { type: String, default: '' },
  thirdTitle: { type: String, default: "CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024" },
  thirdText: { type: String, default: "Lorem ipsum is simply dummy text..." },
  thirdImage: { type: String, default: '' },
  eventCards: { 
    type: [{
      title: { type: String, default: "Opening" },
      details: { type: String, default: "<p><span>Date:</span> November 00, 0000</p><p><span>Time:</span> 00:00 PM</p><p><span>Place:</span> Palawan State University, Gymnasium" }
    }],
    default: [{
      title: "Opening",
      details: "<p><span>Date:</span> November 00, 0000</p><p><span>Time:</span> 00:00 PM</p><p><span>Place:</span> Palawan State University, Gymnasium"
    }]
  },
  tryoutCards: { 
    type: [{
      title: { type: String, default: "Opening" },
      details: { type: String, default: "<p><span>Date:</span> November 00, 0000</p><p><span>Time:</span> 00:00 PM</p><p><span>Place:</span> Palawan State University, Gymnasium" }
    }],
    default: [{
      title: "Opening",
      details: "<p><span>Date:</span> November 00, 0000</p><p><span>Time:</span> 00:00 PM</p><p><span>Place:</span> Palawan State University, Gymnasium"
    }]
  }
});

module.exports = mongoose.model('LandingContent', LandingContentSchema);
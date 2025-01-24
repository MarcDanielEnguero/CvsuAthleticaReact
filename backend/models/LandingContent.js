// models/LandingContent.js
const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  details: { type: String, required: true, trim: true, maxlength: 500 },
});

const LandingContentSchema = new mongoose.Schema(
  {
    newsTitle: { type: String, required: true, trim: true, maxlength: 150 },
    newsText: { type: String, required: true, trim: true },
    newsImage: { type: String, default: 'default-news-image.png' }, // Default value
    thirdTitle: { type: String, required: true, trim: true, maxlength: 150 },
    thirdText: { type: String, required: true, trim: true },
    thirdImage: { type: String, default: 'default-third-image.png' }, // Default value
    eventCards: [CardSchema],
    tryoutCards: [CardSchema],
    lastUpdated: {
      type: Date,
      default: Date.now,
      index: true, // Added index
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

module.exports = mongoose.model('LandingContent', LandingContentSchema);

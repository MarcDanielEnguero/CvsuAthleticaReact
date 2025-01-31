const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/auth');
const LandingContent = require('../models/LandingContent');

// Get landing content
router.get('/', protect, async (req, res) => {
  console.log('Fetching landing content requested by user:', req.user);

  try {
    // Find the latest landing content
    const content = await LandingContent.findOne().sort({ lastUpdated: -1 });

    if (!content) {
      console.log('No content found. Creating default content.');

      // Create default content if none exists
      const defaultContent = new LandingContent({
        newsTitle: 'CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024',
        newsText: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s.',
        newsImage: '',
        thirdTitle: 'CEIT TABLE TENNIS WOMEN BAGS GOLD LAST UNIVERSITY GAMES 2024',
        thirdText: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s.',
        thirdImage: '',
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
        ],
        updatedBy: req.user._id,
      });

      await defaultContent.save();
      return res.status(201).json({
        success: true,
        message: 'Default content created.',
        data: defaultContent,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Landing content fetched successfully.',
      data: content,
    });
  } catch (error) {
    console.error('Error fetching landing content:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch landing content.',
      error: error.message,
    });
  }
});

// Update landing content (admin only)
router.put('/', protect, checkRole(['admin']), async (req, res) => {
  try {
    const {
      newsTitle,
      newsText,
      newsImage,
      thirdTitle,
      thirdText,
      thirdImage,
      eventCards,
      tryoutCards,
    } = req.body;

    // Validate required fields
    if (!newsTitle || !newsText || !thirdTitle || !thirdText) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: newsTitle, newsText, thirdTitle, and thirdText.',
      });
    }

    // Validate eventCards and tryoutCards structure
    if (!Array.isArray(eventCards) || !Array.isArray(tryoutCards)) {
      return res.status(400).json({
        success: false,
        message: 'eventCards and tryoutCards must be arrays.',
      });
    }

    // Update or create content
    const updatedContent = await LandingContent.findOneAndUpdate(
      {}, // Match any document
      {
        newsTitle,
        newsText,
        newsImage,
        thirdTitle,
        thirdText,
        thirdImage,
        eventCards,
        tryoutCards,
        lastUpdated: new Date(),
        updatedBy: req.user._id,
      },
      { new: true, upsert: true } // Create new document if none exists
    );

    console.log('Landing content updated by admin:', req.user._id);
    res.status(200).json({
      success: true,
      message: 'Landing content updated successfully.',
      data: updatedContent,
    });
  } catch (error) {
    console.error('Error updating landing content:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update landing content.',
      error: error.message,
    });
  }
});

module.exports = router;
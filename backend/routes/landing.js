const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/auth');
const LandingContent = require('../models/LandingContent');

// Get landing content
router.get('/', protect, async (req, res) => {
  console.log('Fetching landing content requested by user:', req.user);

  try {
    const content = await LandingContent.findOne().sort({ lastUpdated: -1 });

    if (!content) {
      console.log('No content found. Creating default content.');

      // Create default content if none exists
      const defaultContent = new LandingContent({
        newsTitle: 'Default News',
        newsText: 'This is the default news text.',
        thirdTitle: 'Default Title',
        thirdText: 'This is the default third section text.',
        eventCards: [],
        tryoutCards: [],
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

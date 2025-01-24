const LandingContent = require('../models/LandingContent');

// Get landing content
exports.getLandingContent = async (req, res) => {
  try {
    const content = await LandingContent.findOne().sort({ lastUpdated: -1 });
    if (!content) {
      // Default content when nothing is found
      return res.json({ 
        message: 'No content found. Returning default content.', 
        content: {
          newsTitle: 'Default News',
          newsText: 'Default Text',
          thirdTitle: 'Default Title',
          thirdText: 'Default Text',
          eventCards: [],
          tryoutCards: []
        }
      });
    }
    res.status(200).json(content);
  } catch (error) {
    console.error('Error fetching landing content:', error);
    res.status(500).json({ 
      message: 'Error fetching landing content.', 
      error: error.message 
    });
  }
};

// Update landing content
exports.updateLandingContent = async (req, res) => {
  try {
    const { 
      newsTitle, newsText, newsImage, 
      thirdTitle, thirdText, thirdImage, 
      eventCards, tryoutCards 
    } = req.body;

    // Validation: Check required fields
    if (!newsTitle || !newsText) {
      return res.status(400).json({ message: 'Missing required fields: newsTitle or newsText.' });
    }

    // Validation: Check eventCards and tryoutCards are arrays
    if (!Array.isArray(eventCards) || !Array.isArray(tryoutCards)) {
      return res.status(400).json({ 
        message: 'eventCards and tryoutCards must be arrays.' 
      });
    }

    // Update or insert content
    const updatedContent = await LandingContent.findOneAndUpdate(
      {},
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
        updatedBy: req.user?._id || 'Unknown',
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: 'Landing content updated successfully.',
      content: updatedContent,
    });
  } catch (error) {
    console.error('Error updating landing content:', error);
    res.status(500).json({ 
      message: 'Error updating landing content.', 
      error: error.message 
    });
  }
};

// Delete all landing content
exports.deleteLandingContent = async (req, res) => {
  try {
    await LandingContent.deleteMany({});
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting landing content:', error);
    res.status(500).json({ 
      message: 'Error deleting landing content.', 
      error: error.message 
    });
  }
};

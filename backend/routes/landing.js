const express = require('express');
const router = express.Router();
const LandingContent = require('../models/LandingContent');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, 'image-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).fields([
  { name: 'newsImage', maxCount: 1 },
  { name: 'thirdImage', maxCount: 1 }
]);

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only!'));
  }
}

// Logging middleware
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

router.get('/landing', async (req, res) => {
  try {
    console.log('Received GET request to /landing');
    console.log('Request headers:', req.headers);
    console.log('Request method:', req.method);
    
    let content = await LandingContent.findOne();
    
    if (!content) {
      console.log('No existing content found, creating default');
      content = await LandingContent.create({});
    }
    
    console.log('Landing content retrieved:', content);
    res.json(content);
  } catch (error) {
    console.error('GET landing content error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: 'Server error retrieving landing content', 
      error: error.message 
    });
  }
});

router.put('/landing', upload, async (req, res) => {
  try {
    console.log('Received PUT request to /landing');
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    // Find existing content
    let content = await LandingContent.findOne();
    if (!content) {
      content = new LandingContent();
    }

    // Update text fields
    content.newsTitle = req.body.newsTitle || content.newsTitle;
    content.newsText = req.body.newsText || content.newsText;
    content.thirdTitle = req.body.thirdTitle || content.thirdTitle;
    content.thirdText = req.body.thirdText || content.thirdText;

    // Parse and update event and tryout cards
    if (req.body.eventCards) {
      content.eventCards = JSON.parse(req.body.eventCards);
    }
    if (req.body.tryoutCards) {
      content.tryoutCards = JSON.parse(req.body.tryoutCards);
    }

    // Handle image uploads
    if (req.files) {
      if (req.files.newsImage) {
        const newsImagePath = req.files.newsImage[0].path;
        // Ensure the path starts with '/uploads/'
        content.newsImage = '/uploads/' + newsImagePath.replace(/\\/g, '/').split('/').pop();
      }
      if (req.files.thirdImage) {
        const thirdImagePath = req.files.thirdImage[0].path;
        // Ensure the path starts with '/uploads/'
        content.thirdImage = '/uploads/' + thirdImagePath.replace(/\\/g, '/').split('/').pop();
      }
    }

    // Save updated content
    const updatedContent = await content.save();
    console.log('Content updated successfully');
    res.json(updatedContent);
  } catch (error) {
    console.error('PUT landing content error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: 'Server error updating landing content', 
      error: error.message 
    });
  }
});

module.exports = router;
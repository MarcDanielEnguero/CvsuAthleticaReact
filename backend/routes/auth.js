const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Validation middleware
const validateRequest = (req, res, next) => {
  console.log('Received request:', {
    method: req.method,
    path: req.path,
    body: req.body,
    headers: req.headers
  });
  next();
};

// Login route with enhanced error handling
router.post('/login', validateRequest, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Check if it's a Google account
    if (user.googleId && !user.password) {
      return res.status(400).json({ 
        success: false,
        message: 'This account uses Google Sign-In. Please login with Google.'
      });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ 
        success: false,
        message: 'Account is inactive' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Send successful response
    res.status(200).json({
      success: true,
      token,
      user: {
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Login failed. Please try again.',
      error: error.message 
    });
  }
});

// Google login route with enhanced validation
router.post('/google', validateRequest, async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ 
        success: false,
        message: 'No credential provided' 
      });
    }

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    // Validate CvSU email domain
    if (!email.endsWith('@cvsu.edu.ph')) {
      return res.status(403).json({ 
        success: false,
        message: 'Please use your CvSU email address to login.' 
      });
    }

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        email,
        googleId: payload.sub,
        role: 'student',
        isActive: true,
        name: payload.name || ''
      });
      console.log('New user created:', user.email);
    } else if (!user.googleId) {
      // Update existing user's Google ID if not set
      user.googleId = payload.sub;
      await user.save();
      console.log('Updated existing user with Google ID:', user.email);
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Send successful response
    res.status(200).json({
      success: true,
      token,
      user: {
        email: user.email,
        role: user.role,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Google authentication error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Authentication failed. Please try again.',
      error: error.message 
    });
  }
});

module.exports = router;
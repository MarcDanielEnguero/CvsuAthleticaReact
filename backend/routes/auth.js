const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const router = express.Router();

// Create a Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Regular email/password login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is inactive' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send successful response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// Google login route
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      console.error('No credential provided');
      return res.status(400).json({ error: 'No credential provided' });
    }

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log('Google payload:', payload);

    // Check if the email is from CvSU domain
    if (!payload.email.endsWith('@cvsu.edu.ph')) {
      console.error('Invalid email domain:', payload.email);
      return res.status(403).json({ 
        error: 'Please use your CvSU email address to login.' 
      });
    }

    // Find or create user
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        email: payload.email,
        googleId: payload.sub,
        role: 'student',
        isActive: true
      });
      console.log('New user created:', user.email);
    } else {
      // Update existing user's Google ID if not set
      if (!user.googleId) {
        user.googleId = payload.sub;
        await user.save();
        console.log('Updated existing user with Google ID:', user.email);
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send successful response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Google authentication error:', error);
    res.status(500).json({ 
      error: 'Authentication failed. Please try again.' 
    });
  }
});

module.exports = router;
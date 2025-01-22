// controllers/authController.js
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust if your User model is located elsewhere

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticateWithGoogle = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: 'No credential provided' });
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,  // Your Google Client ID here
    });

    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, create a new user (optional)
      user = new User({
        googleId: sub,
        email,
        name,
        role: 'student',  // Default role, adjust as needed
      });

      await user.save();
    }

    // Generate JWT token for the user
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send back the JWT token
    res.status(200).json({ token });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Google login failed' });
  }
};

module.exports = { authenticateWithGoogle };

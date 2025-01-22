// backend/controllers/authController.js
const axios = require('axios');
const jwt = require('jsonwebtoken');

// Authenticate with Google using the credential (Google token)
const authenticateWithGoogle = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ error: 'No credential provided.' });
  }

  try {
    // Verify Google token
    const ticket = await verifyGoogleToken(credential);

    // Extract email and other user info from the Google token
    const { email } = ticket.getPayload();

    // Ensure the email domain matches CvSU
    if (!email.endsWith('@cvsu.edu.ph')) {
      return res.status(400).json({ error: 'Invalid email domain. Please use a CvSU email.' });
    }

    // Optionally, find or create a user in your database here, e.g.
    // const user = await User.findOrCreate({ email });

    // Create a JWT token for the user
    const token = jwt.sign({ email, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token });
  } catch (error) {
    console.error('Google login error:', error);
    return res.status(500).json({ error: 'Failed to authenticate with Google.' });
  }
};

// Helper function to verify the Google token
const verifyGoogleToken = async (token) => {
  const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
  const response = await axios.get(url);
  return response.data;
};

module.exports = { authenticateWithGoogle };

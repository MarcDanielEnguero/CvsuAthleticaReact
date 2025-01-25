const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model

// Authenticate with Google using the credential (Google token)
const authenticateWithGoogle = async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({ success: false, error: 'No credential provided.' });
    }

    try {
        // Verify Google token
        const ticket = await verifyGoogleToken(credential);

        // Extract email and other user info from the Google token
        const { email, name, sub: googleId } = ticket;

        // Ensure the email domain matches CvSU
        if (!email.endsWith('@cvsu.edu.ph')) {
            return res.status(400).json({ success: false, error: 'Invalid email domain. Please use a CvSU email.' });
        }

        // Check if user already exists in the database
        let user = await User.findOne({ email });

        if (!user) {
            // Create a new user if it doesn't exist
            user = await User.create({
                email,
                googleId,
                role: 'student', // Default role for new users
                isActive: true,
                name: name || 'Unnamed User',
            });
        } else if (!user.googleId) {
            // Update the existing user with the Google ID if not already linked
            user.googleId = googleId;
            await user.save();
        }

        // Create a JWT token for the user
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            success: true,
            message: 'Authenticated successfully with Google.',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
            },
        });
    } catch (error) {
        console.error('Google login error:', error);
        return res.status(500).json({ success: false, error: 'Failed to authenticate with Google.' });
    }
};

// Helper function to verify the Google token
const verifyGoogleToken = async (token) => {
    try {
        const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error('Invalid token response from Google.');
        }

        return response.data; // Returns Google token payload
    } catch (error) {
        console.error('Google token verification failed:', error.message);
        throw new Error('Invalid or expired Google token.');
    }
};

module.exports = { authenticateWithGoogle };

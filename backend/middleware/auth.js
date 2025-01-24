const axios = require('axios');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticateWithGoogle = async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({ success: false, error: 'No credential provided.' });
    }

    try {
        const ticket = await verifyGoogleToken(credential);
        const { email, name, sub: googleId } = ticket;

        if (!email.endsWith('@cvsu.edu.ph')) {
            return res.status(400).json({ success: false, error: 'Invalid email domain. Please use a CvSU email.' });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email,
                googleId,
                role: 'student',
                isActive: true,
                name: name || 'Unnamed User',
            });
        } else if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
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
        console.error('Google login error:', error.message);
        res.status(500).json({ success: false, error: 'Failed to authenticate with Google.' });
    }
};

const verifyGoogleToken = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        return ticket.getPayload();
    } catch (error) {
        console.error('Google token verification failed:', error.message);
        throw new Error('Invalid or expired Google token.');
    }
};

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, no token provided.',
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found.',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.',
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please log in again.',
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Server authentication error.',
        });
    }
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            console.warn(
                `Access denied for user ${req.user.email} with role ${req.user.role}. Required roles: ${roles.join(', ')}.`
            );
            return res.status(403).json({
                success: false,
                message: 'Access denied. Insufficient permissions.',
            });
        }
        next();
    };
};

const manualLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found.',
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials.',
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Logged in successfully.',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
            },
        });
    } catch (error) {
        console.error('Manual login error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Login failed.',
        });
    }
};

module.exports = {
    authenticateWithGoogle,
    verifyGoogleToken,
    protect,
    checkRole,
    manualLogin,
};

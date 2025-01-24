const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateWithGoogle = async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({ success: false, error: 'No credential provided.' });
    }

    try {
        const ticket = await verifyGoogleToken(credential);
        const { email, name, sub: googleId } = ticket;

        if (!email.endsWith('@cvsu.edu.ph')) {
            return res.status(400).json({ success: false, error: 'Invalid email domain.' });
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

        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            message: 'Authenticated successfully',
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
        return res.status(500).json({ success: false, error: 'Authentication failed' });
    }
};

const verifyGoogleToken = async (token) => {
    try {
        const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error('Invalid token');
        }

        return response.data;
    } catch (error) {
        console.error('Token verification failed:', error.message);
        throw new Error('Invalid token');
    }
};

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
    );
};

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ 
                message: 'No token',
                details: 'Invalid Authorization header' 
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET || 'your-secret-key'
        );

        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ 
                message: 'User not found',
                details: 'Invalid token' 
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication Error:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                message: 'Invalid token',
                details: error.message 
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Token expired',
                details: 'Relogin required' 
            });
        }

        res.status(500).json({ 
            message: 'Authentication error',
            details: error.message 
        });
    }
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: 'Access denied' 
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
            return res.status(400).json({ success: false, error: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, error: 'Login failed' });
    }
};

module.exports = { 
    authenticateWithGoogle, 
    protect, 
    checkRole,
    manualLogin 
};
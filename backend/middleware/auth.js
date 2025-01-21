const jwt = require('jsonwebtoken');

// Main authentication middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Public routes middleware (for Landing and Login)
const publicRoute = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(); // Allow access if no token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // If user is already authenticated, redirect to appropriate page
    return res.status(303).json({ 
      redirect: decoded.role === 'admin' ? '/admin/dashboard' : '/campus'
    });
  } catch (error) {
    // If token is invalid, allow access to public routes
    next();
  }
};

// Admin route protection
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin only.' });
  }

  next();
};

// Protected route middleware (requires authentication but not admin)
const studentOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }

  if (req.user.role !== 'student') {
    return res.status(403).json({ error: 'Access denied. Students only.' });
  }

  next();
};

module.exports = {
  verifyToken,
  publicRoute,
  adminOnly,
  studentOnly
};
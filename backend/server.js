const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Middleware for parsing JSON and URL-encoded data
app.use(
  express.json({
    limit: '10mb',
  })
);
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
const authRoutes = require('./routes/auth');
const registrationRoutes = require('./routes/registration');
const userRoutes = require('./routes/user');
const landingRoutes = require('./routes/landing');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api/user', userRoutes);
app.use('/api/landing', landingRoutes);

// Debug logs for routes initialization
console.log('Routes initialized:', {
  authRoutes: typeof authRoutes,
  registrationRoutes: typeof registrationRoutes,
  userRoutes: typeof userRoutes,
  landingRoutes: typeof landingRoutes,
});

// Catch-all route for undefined paths
app.use((req, res) => {
  res.status(404).json({
    error: 'Route Not Found',
    method: req.method,
    path: req.url,
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// MongoDB connection and server startup
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected to MongoDB.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error.message);
    process.exit(1); // Exit with failure
  }
};

startServer();

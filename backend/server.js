const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const coachRoutes = require('./routes/coaches'); // Fix import name

// Load environment variables
dotenv.config();

// Ensure required environment variables are defined
if (!process.env.MONGO_URI || !process.env.FRONTEND_URL) {
  console.error('Missing required environment variables: MONGO_URI or FRONTEND_URL');
  process.exit(1);
}

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Middleware
app.use(
  express.json({
    limit: '10mb',
    strict: false,
  })
);
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log('=== Incoming Request ===');
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Incoming request headers:', req.headers);
  console.log('Incoming request body:', req.body);
  next();
});

// Routes
const authRoutes = require('./routes/auth');
const registrationRoutes = require('./routes/registration');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api/user', userRoutes);
app.use('/coaches', coachRoutes); // Fix route name

// Catch-all route to help diagnose routing issues
app.use((req, res, next) => {
  console.log('404 - Route Not Found:', req.method, req.url);
  res.status(404).json({
    error: 'Route Not Found',
    method: req.method,
    path: req.url,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

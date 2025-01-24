const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');

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

// Middleware - ensure these are in the correct order
app.use(
  express.json({
    limit: '10mb',
    strict: false, // More flexible JSON parsing
  })
);
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Comprehensive request logging middleware
app.use((req, res, next) => {
  console.log('=== Incoming Request ===');
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Full URL:', req.protocol + '://' + req.get('host') + req.originalUrl);
  console.log('Incoming request headers:', JSON.stringify(req.headers, null, 2));
  console.log('Incoming request body:', JSON.stringify(req.body, null, 2));
  next();
});

// Routes
const authRoutes = require('./routes/auth'); // Import the auth.js file
const registrationRoutes = require('./routes/registration');


// Mount routes
app.use('/api/auth', authRoutes); // Use the auth routes
app.use('/api/registration', registrationRoutes); // Use the registration routes
app.use('/api/user', userRoutes); // Use the user routes

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
    stack: err.stack,
  });
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

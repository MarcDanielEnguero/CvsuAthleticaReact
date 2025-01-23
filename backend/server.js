const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const Registration = require('./models/Registration');  // Ensure the correct model is imported

// Initialize dotenv to access environment variables
dotenv.config();
const app = express();

// CORS setup for allowing requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000',  // Your frontend URL
  credentials: true,  // Allow credentials (cookies, session info)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for parsing JSON request bodies
app.use(express.json());

// Session configuration (optional, if you're using sessions)
app.use(session({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Add route for handling free training form submissions
app.post('/api/free-training', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Form Data Received:', formData);  // Log the incoming form data

    // Create a new Registration instance with form data
    const registration = new Registration(formData);
    
    // Save the registration data to the database
    await registration.save();
    
    // Send back a success message with the registration ID
    res.status(200).json({
      message: 'Form submitted successfully',
      registrationId: registration._id,  // Respond with registration ID
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/your-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

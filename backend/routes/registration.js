const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find({});
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      studentNumber,
      phoneNumber,
      college,
      department,
      course,
      yearSection,
      cvsuEmail,
      coach,
      type // This will now be "free-training"
    } = req.body;

    console.log('Received registration data:', req.body);

    // Validate the required fields
    if (!firstName || !lastName || !studentNumber || !phoneNumber || 
        !college || !department || !course || !yearSection || 
        !cvsuEmail || !type) { // coach is not required here
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new registration entry
    const registration = new Registration({
      firstName,
      lastName,
      studentNumber,
      phoneNumber,
      college,
      department,
      course,
      yearSection,
      cvsuEmail,
      type // Include type when creating the registration
    });

    await registration.save();
    res.status(201).json({ 
      message: 'Registration successful', 
      registration 
    });
  } catch (error) {
    console.error('Error saving registration:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
});

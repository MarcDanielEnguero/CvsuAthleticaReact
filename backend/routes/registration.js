const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// @route   POST /api/registration
// @desc    Save registration form and coach selection
// @access  Public
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
      coach
    } = req.body;

    // Validate the required fields
    if (!firstName || !lastName || !studentNumber || !phoneNumber || !college || !department || !course || !yearSection || !cvsuEmail || !coach) {
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
      coach
    });

    await registration.save();
    res.status(201).json({ message: 'Registration successful', registration });
  } catch (error) {
    console.error('Error saving registration:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/registration
// @desc    Fetch all registrations
// @access  Public
router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

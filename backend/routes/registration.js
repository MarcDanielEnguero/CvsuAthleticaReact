const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// POST: Create a new registration
router.post('/', async (req, res) => {
  try {
    console.log('Full registration request body:', req.body);

    // Destructure with default values to prevent undefined errors
    const {
      firstName = '',
      lastName = '',
      studentNumber = '',
      phoneNumber = '',
      college = '',
      department = '',
      course = '',
      yearSection = '',
      cvsuEmail = '',
      type = '',
      coach = ''
    } = req.body;

    // Validate the required fields
    const requiredFields = [
      'firstName', 'lastName', 'studentNumber', 'phoneNumber', 
      'college', 'department', 'course', 'yearSection', 'cvsuEmail', 'type', 'coach'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missingFields 
      });
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
      type,
      coach
    });

    await registration.save();
    
    res.status(201).json({ 
      message: 'Registration successful', 
      registrationId: registration._id 
    });
  } catch (error) {
    console.error('Error saving registration:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
});

// GET: Fetch all registrations
router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find(); // Fetch all registrations
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
});

// DELETE: Delete a registration by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the registration exists
    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({ 
        error: 'Registration not found' 
      });
    }

    // Delete the registration
    await registration.deleteOne();
    res.status(200).json({ 
      message: 'Registration deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
});

module.exports = router;

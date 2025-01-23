const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach');  // Import your Coach model

// POST request to add a new coach
router.post('/', async (req, res) => {
  try {
    const { name, sport } = req.body;
    const newCoach = new Coach({ name, sport });
    await newCoach.save();
    res.status(201).json({ message: 'Coach added successfully', coach: newCoach });
  } catch (error) {
    console.error('Error adding coach:', error);
    res.status(500).json({ error: 'Error adding coach' });
  }
});

// GET request to fetch all coaches
router.get('/', async (req, res) => {
  try {
    const coaches = await Coach.find();  // Fetch coaches from the database
    res.status(200).json(coaches);
  } catch (error) {
    console.error('Error fetching coaches:', error);
    res.status(500).json({ error: 'Error fetching coaches' });
  }
});

module.exports = router;

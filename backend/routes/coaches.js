const express = require("express");
const router = express.Router();
const Coach = require("../models/Coach");

let coaches = [
  {
    id: 1,
    name: 'Marco',
    role: 'BASKETBALL & SCAMMER COACH',
    email: 'marco.dalanon@cvsu.edu.ph',
    contact: '09363625388',
    image: '/static/media/coach.fdf4d83a94bd22020102.png',
  },
  {
    id: 2,
    name: 'Elreen Aya De Guzman',
    role: 'TENNIS COACH',
    email: 'elreen.aya.deguzman@cvsu.edu.ph',
    contact: '09155334879',
    image: '/static/media/coach.fdf4d83a94bd22020102.png',
  },
];


// Get all coaches
router.get('/', (req, res) => {
  res.status(200).json(coaches);
});

// Update or add coaches
router.put('/', async (req, res) => {
  const updatedCoaches = req.body;

  if (!Array.isArray(updatedCoaches)) {
    return res.status(400).json({ error: 'Request body must be an array of coaches' });
  }

  try {
    // Replace all coaches in the database with the updated list
    await Coach.deleteMany({});
    const savedCoaches = await Coach.insertMany(updatedCoaches);
    res.status(200).json({ message: 'Coaches updated successfully!', coaches: savedCoaches });
  } catch (error) {
    console.error('Error updating coaches:', error);
    res.status(500).json({ error: 'Failed to update coaches' });
  }
});

module.exports = router;

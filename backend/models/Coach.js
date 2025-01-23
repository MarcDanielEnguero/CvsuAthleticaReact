const mongoose = require('mongoose');

const CoachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true },
});

module.exports = mongoose.model('Coach', CoachSchema);

const mongoose = require('mongoose');

const CoachSchema = new mongoose.Schema({
  name: {type: String},
  role: {type: String},
  email: {type: String },
  contact: {type: String},
  image: {type: String }
});

module.exports = mongoose.model('Coach', CoachSchema);

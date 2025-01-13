const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  studentNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  college: { type: String, required: true },
  department: { type: String, required: true },
  course: { type: String, required: true },
  yearSection: { type: String, required: true },
  cvsuEmail: { type: String, required: true },
  coach: { type: String, required: true }, // Selected coach
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', RegistrationSchema);

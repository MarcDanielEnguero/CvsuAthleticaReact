const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters long']
  },
  lastName: { 
    type: String, 
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters long']
  },
  studentNumber: {
    type: String,
    required: true
  },
  phoneNumber: { 
    type: String, 
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^(09|\+639)\d{9}$/, 'Invalid Philippine phone number']
  },
  college: { 
    type: String, 
    required: [true, 'College is required'],
    trim: true
  },
  department: { 
    type: String, 
    required: [true, 'Department is required'],
    trim: true
  },
  course: { 
    type: String, 
    required: [true, 'Course is required'],
    trim: true
  },
  yearSection: { 
    type: String, 
    required: [true, 'Year and Section are required'],
    trim: true
  },
  cvsuEmail: { 
    type: String, 
    required: [true, 'CvSU email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z0-9._%+-]+@cvsu\.edu\.ph$/, 'Please use a valid CvSU email']
  },
  coach: { 
    type: String, 
    required: [true, 'Coach selection is required'],
    trim: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  status: {
    type: String,
    enum: {
      values: ['Pending', 'Approved', 'Rejected'],
      message: '{VALUE} is not a valid status'
    },
    default: 'Pending'
  },
  type: {  // New field for type
    type: String,
    enum: ['freeTraining', 'tryout'], // Only these two options are allowed
    default: 'freeTraining', // Default is freeTraining
    required: true
  }
}, {
  // Enable error messages for validation
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create a model based on the schema
module.exports = mongoose.model('Registration', RegistrationSchema);

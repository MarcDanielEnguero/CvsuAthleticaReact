const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
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
    required: [true, 'Student number is required'],
    unique: true,
    trim: true
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
  type: {  
    type: String,
    enum: ['freeTraining', 'tryout'], 
    default: 'freeTraining',
    required: true
  }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Registration', registrationSchema);

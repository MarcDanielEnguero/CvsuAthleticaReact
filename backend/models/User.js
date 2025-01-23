const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z0-9._%+-]+@cvsu\.edu\.ph$/, 'Please use a valid CvSU email address']
  },
  password: {
    type: String,
    required: function() { 
      return !this.googleId; 
    }
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  try {
    // Only hash password if it's modified and exists
    if (!this.isModified('password') || !this.password) {
      return next();
    }
    
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password validity
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    // Check if password exists
    if (!this.password) return false;
    
    // Compare candidate password with stored hashed password
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

// Custom validation for CvSU email
userSchema.path('email').validate(function(value) {
  return /^[a-zA-Z0-9._%+-]+@cvsu\.edu\.ph$/.test(value);
}, 'Invalid email domain. Please use a CvSU email address.');

module.exports = mongoose.model('User', userSchema);
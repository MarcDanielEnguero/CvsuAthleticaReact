const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User'); // Path to your User model

dotenv.config();

const createUser = async () => {
    try {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log('MongoDB connected');
  
      const hashedPassword = await bcrypt.hash('yourpassword', 10);
      const newUser = new User({
        email: 'newemail@example.com',
        password: hashedPassword,
      });
  
      console.log('Attempting to save user...');
      await newUser.save();
      console.log('User created successfully');
      mongoose.disconnect();
    } catch (err) {
      console.error('Error:', err.message);
    }
  };
  
  createUser();
  

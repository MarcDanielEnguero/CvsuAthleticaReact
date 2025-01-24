const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createUser = async (email, password, role = 'student') => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            role
        });

        console.log('Attempting to save user...');
        await newUser.save();
        console.log('User created successfully:', {
            email,
            role
        });
        mongoose.disconnect();
    } catch (err) {
        console.error('Error:', err.message);
    }
};

// Example usage:
// For creating a student user
// createUser('student@example.com', 'studentpassword', 'student');

// For creating an admin user
// createUser('admin@example.com', 'adminpassword', 'admin');

// If no arguments provided, create a default user
if (require.main === module) {
    createUser('main.marcdaniel.enguer@cvsu.edu.com', 'yourpassword', 'admin');
}

module.exports = createUser;
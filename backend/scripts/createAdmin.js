require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const createAdmin = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/docusafe', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@docusafe.com',
            password: 'admin123',
            role: 'admin'
        });

        console.log('Admin user created:', admin);
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

createAdmin(); 
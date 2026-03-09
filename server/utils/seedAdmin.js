require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const adminExists = await User.findOne({ email: 'admin@vaxbook.com' });
        
        if (adminExists) {
            console.log('Admin already exists');
            process.exit();
        }

        await User.create({
            first_name: 'Admin',
            last_name: 'User',
            email: 'admin@vaxbook.com',
            password: 'admin123',
            gender: 'Male',
            covid: 'No',
            phone: '9999999999',
            aadhar: '999999999999',
            dob: new Date('1990-01-01'),
            country: 'India',
            state: 'Delhi',
            city: 'New Delhi',
            role: 'admin'
        });

        console.log('✅ Admin created successfully');
        console.log('Email: admin@vaxbook.com');
        console.log('Password: admin123');
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createAdmin();

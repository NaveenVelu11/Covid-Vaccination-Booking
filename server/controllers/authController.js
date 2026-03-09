const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    
    res.status(statusCode).json({
        status: 'ok',
        token,
        user: {
            id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role
        }
    });
};

exports.register = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ 
            $or: [{ email: req.body.email }, { aadhar: req.body.aadhar }] 
        });

        if (existingUser) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'User with this email or Aadhar already exists' 
            });
        }

        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            covid: req.body.covid,
            phone: req.body.phone,
            aadhar: req.body.aadhar,
            dob: req.body.dob,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city
        });

        createSendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'Please provide email and password' 
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ 
                status: 'error', 
                message: 'Incorrect email or password' 
            });
        }

        if (!user.isActive) {
            return res.status(401).json({ 
                status: 'error', 
                message: 'Your account has been deactivated' 
            });
        }

        createSendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            status: 'ok',
            user
        });
    } catch (error) {
        next(error);
    }
};

const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validator');

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('phone').matches(/^\d{10}$/).withMessage('Phone must be 10 digits'),
    body('aadhar').matches(/^\d{12}$/).withMessage('Aadhar must be 12 digits'),
    validate
], authController.register);

router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    validate
], authController.login);

router.get('/me', protect, authController.getMe);

module.exports = router;

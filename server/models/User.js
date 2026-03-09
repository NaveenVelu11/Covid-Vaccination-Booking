const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        first_name: { 
            type: String, 
            required: [true, 'First name is required'],
            trim: true 
        },
        last_name: { 
            type: String, 
            required: [true, 'Last name is required'],
            trim: true 
        },
        email: { 
            type: String, 
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
        },
        password: { 
            type: String, 
            required: [true, 'Password is required'],
            minlength: 6,
            select: false
        },
        gender: { 
            type: String, 
            enum: ['Male', 'Female', 'Other'],
            required: true 
        },
        covid: { 
            type: String, 
            enum: ['Yes', 'No'],
            required: true 
        },
        phone: { 
            type: String, 
            required: [true, 'Phone number is required'],
            match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
        },
        aadhar: { 
            type: String, 
            required: [true, 'Aadhar number is required'],
            unique: true,
            match: [/^\d{12}$/, 'Please provide a valid 12-digit Aadhar number']
        },
        dob: { 
            type: Date, 
            required: [true, 'Date of birth is required']
        },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        isActive: { type: Boolean, default: true }
    },
    { 
        collection: 'users',
        timestamps: true 
    }
);

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model("User", userSchema);

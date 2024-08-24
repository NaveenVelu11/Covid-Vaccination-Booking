const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        first_name: { type: String },
        last_name: { type: String },
        email: { type: String },
        password: { type: String },
        gender: { type: String },
        covid: { type: String },
        phone: { type: Number },
        aadhar: { type: Number },
        dob: { type: Date },
        country:{ type: String },
        state:{ type: String },
        city:{ type: String },
    },
    { collection: 'User' }
)

const User = new mongoose.model("User", userSchema)

module.exports = User

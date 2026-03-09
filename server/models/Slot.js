const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema(
    {
        slot_id: { 
            type: String,
            required: true,
            index: true
        },
        slot_date: { 
            type: Date,
            required: true,
            index: true
        },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        user_id: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        dose: { 
            type: String,
            enum: ['Dose 1', 'Dose 2', 'Booster'],
            required: true
        },
        status: {
            type: String,
            enum: ['confirmed', 'cancelled', 'completed'],
            default: 'confirmed'
        },
        vaccine_type: {
            type: String,
            enum: ['Covishield', 'Covaxin', 'Sputnik V', 'Moderna', 'Pfizer'],
            default: 'Covishield'
        }
    },
    { 
        collection: 'booked_slots',
        timestamps: true 
    }
);

slotSchema.index({ slot_date: 1, slot_id: 1, country: 1, state: 1, city: 1 });

module.exports = mongoose.model("Slot", slotSchema);

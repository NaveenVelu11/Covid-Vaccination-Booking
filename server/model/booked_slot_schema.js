const mongoose = require('mongoose');
const User = require('./user_schema');

const Schema = mongoose.Schema;

const slotSchema = Schema(
	{
		slot_id: { type: String},
        slot_date: { type: Date},
		country: { type: String },
		state: { type: String},
        city: { type: String },
        user_id: { type: String },
		dose:{ type: String },
        
		
	},
	{ collection: 'Booked slots' }
)

const Slot = new mongoose.model("Booked slots", slotSchema)

module.exports = Slot

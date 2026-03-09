const Slot = require('../models/Slot');
const User = require('../models/User');

exports.getSlotCapacity = async (req, res, next) => {
    try {
        const { date, country, state, city } = req.body;

        const capacity = await Slot.aggregate([
            {
                $match: {
                    slot_date: new Date(date),
                    country,
                    state,
                    city,
                    status: 'confirmed'
                }
            },
            { $group: { _id: "$slot_id", count: { $sum: 1 } } }
        ]);

        res.json({ status: 'ok', capacity });
    } catch (error) {
        next(error);
    }
};

exports.bookSlot = async (req, res, next) => {
    try {
        const { slot_id, slot_date, country, state, city, dose, vaccine_type } = req.body;

        const existingBooking = await Slot.findOne({
            user_id: req.user.id,
            slot_date: new Date(slot_date),
            status: 'confirmed'
        });

        if (existingBooking) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'You already have a booking for this date' 
            });
        }

        const slot = await Slot.create({
            slot_id,
            slot_date,
            country,
            state,
            city,
            user_id: req.user.id,
            dose,
            vaccine_type: vaccine_type || 'Covishield'
        });

        res.status(201).json({ status: 'ok', slot });
    } catch (error) {
        next(error);
    }
};

exports.getMyBookings = async (req, res, next) => {
    try {
        const slots = await Slot.find({ user_id: req.user.id })
            .sort({ slot_date: -1 })
            .populate('user_id', 'first_name last_name email phone');

        res.json({ status: 'ok', slots });
    } catch (error) {
        next(error);
    }
};

exports.cancelBooking = async (req, res, next) => {
    try {
        const slot = await Slot.findOne({ 
            _id: req.params.id, 
            user_id: req.user.id 
        });

        if (!slot) {
            return res.status(404).json({ 
                status: 'error', 
                message: 'Booking not found' 
            });
        }

        slot.status = 'cancelled';
        await slot.save();

        res.json({ status: 'ok', message: 'Booking cancelled successfully' });
    } catch (error) {
        next(error);
    }
};

exports.getBookedUsers = async (req, res, next) => {
    try {
        const { date } = req.body;

        const slots = await Slot.find({ 
            slot_date: new Date(date),
            status: 'confirmed'
        }).populate('user_id');

        if (slots.length === 0) {
            return res.json({ status: 'ok', details: [] });
        }

        const details = slots.map(slot => slot.user_id);
        res.json({ status: 'ok', details });
    } catch (error) {
        next(error);
    }
};

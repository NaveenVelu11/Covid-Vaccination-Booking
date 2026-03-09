const Slot = require('../models/Slot');
const User = require('../models/User');

exports.getDoseStats = async (req, res, next) => {
    try {
        const { dose } = req.body;

        const stats = await Slot.aggregate([
            { $match: { dose, status: 'confirmed' } },
            { 
                $group: { 
                    _id: { $dateToString: { format: "%m-%Y", date: "$slot_date" } }, 
                    count: { $sum: 1 } 
                } 
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({ status: 'ok', dose: stats });
    } catch (error) {
        next(error);
    }
};

exports.getGenderStats = async (req, res, next) => {
    try {
        const stats = await User.aggregate([
            { $group: { _id: '$gender', count: { $sum: 1 } } }
        ]);

        res.json({ status: 'ok', gender: stats });
    } catch (error) {
        next(error);
    }
};

exports.getCovidStats = async (req, res, next) => {
    try {
        const stats = await User.aggregate([
            { $group: { _id: '$covid', count: { $sum: 1 } } }
        ]);

        res.json({ status: 'ok', covid: stats });
    } catch (error) {
        next(error);
    }
};

exports.getOverallStats = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBookings = await Slot.countDocuments({ status: 'confirmed' });
        const dose1Count = await Slot.countDocuments({ dose: 'Dose 1', status: 'confirmed' });
        const dose2Count = await Slot.countDocuments({ dose: 'Dose 2', status: 'confirmed' });

        res.json({
            status: 'ok',
            stats: {
                totalUsers,
                totalBookings,
                dose1Count,
                dose2Count
            }
        });
    } catch (error) {
        next(error);
    }
};

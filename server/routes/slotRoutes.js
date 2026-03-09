const express = require('express');
const slotController = require('../controllers/slotController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/capacity', slotController.getSlotCapacity);
router.post('/book', slotController.bookSlot);
router.get('/my-bookings', slotController.getMyBookings);
router.patch('/cancel/:id', slotController.cancelBooking);
router.post('/booked-users', restrictTo('admin'), slotController.getBookedUsers);

module.exports = router;

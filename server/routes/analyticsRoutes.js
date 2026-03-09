const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/dose', analyticsController.getDoseStats);
router.get('/gender', analyticsController.getGenderStats);
router.get('/covid', analyticsController.getCovidStats);
router.get('/overall', analyticsController.getOverallStats);

module.exports = router;

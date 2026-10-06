const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/statsController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', requireAuth, getStats);

module.exports = router;

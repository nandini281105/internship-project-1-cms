const express = require('express');
const router = express.Router();
const {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience
} = require('../controllers/experienceController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', getExperiences);
router.post('/', requireAuth, createExperience);
router.put('/:id', requireAuth, updateExperience);
router.delete('/:id', requireAuth, deleteExperience);

module.exports = router;

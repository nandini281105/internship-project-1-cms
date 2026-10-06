const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonialController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', getTestimonials);
router.post('/', requireAuth, createTestimonial);
router.put('/:id', requireAuth, updateTestimonial);
router.delete('/:id', requireAuth, deleteTestimonial);

module.exports = router;

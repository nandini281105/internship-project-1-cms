const express = require('express');
const router = express.Router();
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', getSkills);
router.post('/', requireAuth, createSkill);
router.put('/:id', requireAuth, updateSkill);
router.delete('/:id', requireAuth, deleteSkill);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  markMessageRead,
  deleteMessage
} = require('../controllers/messageController');
const { requireAuth } = require('../middleware/authMiddleware');

// Public contact submission
router.post('/contact', createMessage);

// Admin messages management
router.get('/messages', requireAuth, getMessages);
router.patch('/messages/:id/read', requireAuth, markMessageRead);
router.delete('/messages/:id', requireAuth, deleteMessage);

module.exports = router;

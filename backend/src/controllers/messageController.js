const prisma = require('../config/prisma');
const { sendContactNotification } = require('../utils/email');

// POST /api/contact (Public Contact Form submission)
const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        subject: subject || 'New Portfolio Inquiry',
        message,
        read: false
      }
    });

    // Asynchronously trigger notification
    sendContactNotification({ name, email, subject, message }).catch((err) => {
      console.error('Notification dispatch warning:', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      data: newMessage
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/messages (Admin)
const getMessages = async (req, res, next) => {
  try {
    const { unreadOnly } = req.query;
    const where = unreadOnly === 'true' ? { read: false } : {};

    const [messages, unreadCount] = await Promise.all([
      prisma.message.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.message.count({ where: { read: false } })
    ]);

    return res.status(200).json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/messages/:id/read (Admin)
const markMessageRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    const message = await prisma.message.update({
      where: { id },
      data: { read: read !== undefined ? Boolean(read) : true }
    });

    return res.status(200).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/messages/:id (Admin)
const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.message.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
  markMessageRead,
  deleteMessage
};

const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { requireAuth } = require('../middleware/authMiddleware');
const { uploadFile, getMediaList, deleteMedia } = require('../controllers/uploadController');

// Upload single file (Admin)
router.post('/upload', requireAuth, upload.single('file'), uploadFile);

// Upload image alias as per doc (POST /upload/image)
router.post('/upload/image', requireAuth, upload.single('image'), uploadFile);

// Get media library list (Admin)
router.get('/media', requireAuth, getMediaList);

// Delete media item (Admin)
router.delete('/media/:id', requireAuth, deleteMedia);

module.exports = router;

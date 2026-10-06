const prisma = require('../config/prisma');
const fs = require('fs');
const path = require('path');

// POST /api/upload (Admin)
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Construct accessible static URL
    const fileUrl = `/uploads/${req.file.filename}`;

    const mediaRecord = await prisma.media.create({
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: fileUrl
      }
    });

    return res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        id: mediaRecord.id,
        filename: mediaRecord.filename,
        originalName: mediaRecord.originalName,
        url: fileUrl,
        size: mediaRecord.size
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/media (Admin)
const getMediaList = async (req, res, next) => {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json({ success: true, count: media.length, data: media });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/media/:id (Admin)
const deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const media = await prisma.media.findUnique({ where: { id } });

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media record not found' });
    }

    // Remove file from disk if present
    const filePath = path.join(__dirname, '../../uploads', media.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn('File removal from disk failed:', err.message);
      }
    }

    await prisma.media.delete({ where: { id } });

    return res.status(200).json({ success: true, message: 'Media asset deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
  getMediaList,
  deleteMedia
};

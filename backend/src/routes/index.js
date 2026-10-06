const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const aboutRoutes = require('./aboutRoutes');
const skillRoutes = require('./skillRoutes');
const projectRoutes = require('./projectRoutes');
const blogRoutes = require('./blogRoutes');
const experienceRoutes = require('./experienceRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const serviceRoutes = require('./serviceRoutes');
const messageRoutes = require('./messageRoutes');
const uploadRoutes = require('./uploadRoutes');
const statsRoutes = require('./statsRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/about', aboutRoutes);
router.use('/skills', skillRoutes);
router.use('/projects', projectRoutes);
router.use('/blogs', blogRoutes);
router.use('/experience', experienceRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/services', serviceRoutes);
router.use('/stats', statsRoutes);

// Contact and messages
router.use('/', messageRoutes);

// Uploads and media
router.use('/', uploadRoutes);

module.exports = router;

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const apiRoutes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const prisma = require('./config/prisma');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins in dev, can restrict in production
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files for uploaded images & media
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/api/health', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    if (prisma) {
      await prisma.$queryRaw`SELECT 1`;
      dbStatus = 'connected';
    }
  } catch (err) {
    dbStatus = `error: ${err.message}`;
  }

  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: dbStatus
  });
});

// API Routes mounted at both /api and root level for flexible client integration
app.use('/api', apiRoutes);
app.use('/', apiRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Portfolio CMS Backend running on port ${PORT}`);
  console.log(`📡 API Base URL:  http://localhost:${PORT}/api`);
  console.log(`🖼️ Uploads URL:   http://localhost:${PORT}/uploads`);
  console.log(`🩺 Health Check:  http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

module.exports = app;

const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', requireAuth, createBlog);
router.put('/:id', requireAuth, updateBlog);
router.delete('/:id', requireAuth, deleteBlog);

module.exports = router;

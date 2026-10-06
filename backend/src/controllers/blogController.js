const prisma = require('../config/prisma');

// Helper to slugify title
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
};

// GET /api/blogs (Public)
const getBlogs = async (req, res, next) => {
  try {
    const { category, search, all } = req.query;
    const where = {};

    // If not requested with all=true (by admin), only return published blogs
    if (all !== 'true') {
      where.published = true;
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ];
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    next(error);
  }
};

// GET /api/blogs/:slug (Public)
const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await prisma.blog.findFirst({
      where: {
        OR: [{ slug }, { id: slug }]
      }
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// POST /api/blogs (Admin)
const createBlog = async (req, res, next) => {
  try {
    const { title, slug, excerpt, content, coverImage, category, published, readTime } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const finalSlug = slug ? slugify(slug) : slugify(title) + '-' + Date.now();

    const blog = await prisma.blog.create({
      data: {
        title,
        slug: finalSlug,
        excerpt: excerpt || title,
        content,
        coverImage,
        category: category || 'Tech',
        published: published !== undefined ? Boolean(published) : true,
        readTime: readTime || '5 min read'
      }
    });

    return res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// PUT /api/blogs/:id (Admin)
const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, content, coverImage, category, published, readTime } = req.body;

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: title !== undefined ? title : undefined,
        slug: slug ? slugify(slug) : undefined,
        excerpt: excerpt !== undefined ? excerpt : undefined,
        content: content !== undefined ? content : undefined,
        coverImage: coverImage !== undefined ? coverImage : undefined,
        category: category !== undefined ? category : undefined,
        published: published !== undefined ? Boolean(published) : undefined,
        readTime: readTime !== undefined ? readTime : undefined
      }
    });

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/blogs/:id (Admin)
const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.blog.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
};

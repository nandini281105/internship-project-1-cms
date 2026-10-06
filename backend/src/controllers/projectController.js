const prisma = require('../config/prisma');

// GET /api/projects (Public)
const getProjects = async (req, res, next) => {
  try {
    const { featured, tag } = req.query;
    const where = {};

    if (featured !== undefined) {
      where.featured = featured === 'true';
    }

    if (tag) {
      where.tags = { contains: tag, mode: 'insensitive' };
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
    });

    return res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id
const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects (Admin)
const createProject = async (req, res, next) => {
  try {
    const { title, description, longDescription, imageUrl, demoUrl, githubUrl, tags, featured, order } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        longDescription,
        imageUrl,
        demoUrl,
        githubUrl,
        tags: tags || '',
        featured: Boolean(featured),
        order: order !== undefined ? parseInt(order, 10) : 0
      }
    });

    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id (Admin)
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, longDescription, imageUrl, demoUrl, githubUrl, tags, featured, order } = req.body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: title !== undefined ? title : undefined,
        description: description !== undefined ? description : undefined,
        longDescription: longDescription !== undefined ? longDescription : undefined,
        imageUrl: imageUrl !== undefined ? imageUrl : undefined,
        demoUrl: demoUrl !== undefined ? demoUrl : undefined,
        githubUrl: githubUrl !== undefined ? githubUrl : undefined,
        tags: tags !== undefined ? tags : undefined,
        featured: featured !== undefined ? Boolean(featured) : undefined,
        order: order !== undefined ? parseInt(order, 10) : undefined
      }
    });

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id (Admin)
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};

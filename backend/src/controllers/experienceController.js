const prisma = require('../config/prisma');

// GET /api/experience (Public)
const getExperiences = async (req, res, next) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
    });
    return res.status(200).json({ success: true, count: experiences.length, data: experiences });
  } catch (error) {
    next(error);
  }
};

// POST /api/experience (Admin)
const createExperience = async (req, res, next) => {
  try {
    const { role, company, companyUrl, location, startDate, endDate, current, description, order } = req.body;

    if (!role || !company || !startDate || !description) {
      return res.status(400).json({
        success: false,
        message: 'Role, company, startDate and description are required'
      });
    }

    const experience = await prisma.experience.create({
      data: {
        role,
        company,
        companyUrl,
        location,
        startDate,
        endDate: current ? 'Present' : endDate,
        current: Boolean(current),
        description,
        order: order !== undefined ? parseInt(order, 10) : 0
      }
    });

    return res.status(201).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

// PUT /api/experience/:id (Admin)
const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, company, companyUrl, location, startDate, endDate, current, description, order } = req.body;

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        role: role !== undefined ? role : undefined,
        company: company !== undefined ? company : undefined,
        companyUrl: companyUrl !== undefined ? companyUrl : undefined,
        location: location !== undefined ? location : undefined,
        startDate: startDate !== undefined ? startDate : undefined,
        endDate: current ? 'Present' : (endDate !== undefined ? endDate : undefined),
        current: current !== undefined ? Boolean(current) : undefined,
        description: description !== undefined ? description : undefined,
        order: order !== undefined ? parseInt(order, 10) : undefined
      }
    });

    return res.status(200).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/experience/:id (Admin)
const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.experience.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Experience record deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience
};

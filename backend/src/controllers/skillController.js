const prisma = require('../config/prisma');

// GET /api/skills (Public)
const getSkills = async (req, res, next) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};
    const skills = await prisma.skill.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
    });
    return res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    next(error);
  }
};

// POST /api/skills (Admin)
const createSkill = async (req, res, next) => {
  try {
    const { name, category, proficiency, icon, order } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Skill name is required' });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        category: category || 'Frontend',
        proficiency: proficiency !== undefined ? parseInt(proficiency, 10) : 80,
        icon,
        order: order !== undefined ? parseInt(order, 10) : 0
      }
    });

    return res.status(201).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

// PUT /api/skills/:id (Admin)
const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, proficiency, icon, order } = req.body;

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name: name !== undefined ? name : undefined,
        category: category !== undefined ? category : undefined,
        proficiency: proficiency !== undefined ? parseInt(proficiency, 10) : undefined,
        icon: icon !== undefined ? icon : undefined,
        order: order !== undefined ? parseInt(order, 10) : undefined
      }
    });

    return res.status(200).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/skills/:id (Admin)
const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
};

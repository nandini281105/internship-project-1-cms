const prisma = require('../config/prisma');

// GET /api/services (Public)
const getServices = async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
    });
    return res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
};

// POST /api/services (Admin)
const createService = async (req, res, next) => {
  try {
    const { title, description, icon, price, order } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon: icon || 'Code',
        price,
        order: order !== undefined ? parseInt(order, 10) : 0
      }
    });

    return res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// PUT /api/services/:id (Admin)
const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, icon, price, order } = req.body;

    const service = await prisma.service.update({
      where: { id },
      data: {
        title: title !== undefined ? title : undefined,
        description: description !== undefined ? description : undefined,
        icon: icon !== undefined ? icon : undefined,
        price: price !== undefined ? price : undefined,
        order: order !== undefined ? parseInt(order, 10) : undefined
      }
    });

    return res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/services/:id (Admin)
const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.service.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService
};

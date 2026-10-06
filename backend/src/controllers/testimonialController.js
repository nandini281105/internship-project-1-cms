const prisma = require('../config/prisma');

// GET /api/testimonials (Public)
const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
    });
    return res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    next(error);
  }
};

// POST /api/testimonials (Admin)
const createTestimonial = async (req, res, next) => {
  try {
    const { clientName, position, company, quote, avatarUrl, rating, order } = req.body;

    if (!clientName || !quote) {
      return res.status(400).json({ success: false, message: 'Client name and quote are required' });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        position: position || '',
        company: company || '',
        quote,
        avatarUrl,
        rating: rating !== undefined ? parseInt(rating, 10) : 5,
        order: order !== undefined ? parseInt(order, 10) : 0
      }
    });

    return res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

// PUT /api/testimonials/:id (Admin)
const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { clientName, position, company, quote, avatarUrl, rating, order } = req.body;

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        clientName: clientName !== undefined ? clientName : undefined,
        position: position !== undefined ? position : undefined,
        company: company !== undefined ? company : undefined,
        quote: quote !== undefined ? quote : undefined,
        avatarUrl: avatarUrl !== undefined ? avatarUrl : undefined,
        rating: rating !== undefined ? parseInt(rating, 10) : undefined,
        order: order !== undefined ? parseInt(order, 10) : undefined
      }
    });

    return res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/testimonials/:id (Admin)
const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.testimonial.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};

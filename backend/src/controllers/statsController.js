const prisma = require('../config/prisma');

// GET /api/stats (Admin Dashboard summary)
const getStats = async (req, res, next) => {
  try {
    const [
      projectsCount,
      skillsCount,
      blogsCount,
      messagesCount,
      unreadMessagesCount,
      testimonialsCount,
      servicesCount,
      recentMessages
    ] = await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.blog.count(),
      prisma.message.count(),
      prisma.message.count({ where: { read: false } }),
      prisma.testimonial.count(),
      prisma.service.count(),
      prisma.message.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    return res.status(200).json({
      success: true,
      data: {
        counts: {
          projects: projectsCount,
          skills: skillsCount,
          blogs: blogsCount,
          messages: messagesCount,
          unreadMessages: unreadMessagesCount,
          testimonials: testimonialsCount,
          services: servicesCount
        },
        recentMessages
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats
};

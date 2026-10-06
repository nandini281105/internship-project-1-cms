const prisma = require('../config/prisma');

// GET /api/about (Public)
const getAbout = async (req, res, next) => {
  try {
    let about = await prisma.about.findFirst();
    if (!about) {
      // Default structure if not yet seeded
      about = {
        title: 'Full Stack Software Engineer',
        subtitle: 'Building scalable modern web applications',
        bio: 'Welcome to my portfolio! Update this section in the CMS admin panel.',
        avatarUrl: '',
        resumeUrl: '',
        email: '',
        phone: '',
        location: '',
        githubUrl: '',
        linkedinUrl: '',
        twitterUrl: '',
        yearsExperience: 0,
        completedProjects: 0,
        happyClients: 0
      };
    }
    return res.status(200).json({ success: true, data: about });
  } catch (error) {
    next(error);
  }
};

// PUT /api/about (Admin)
const updateAbout = async (req, res, next) => {
  try {
    const existing = await prisma.about.findFirst();
    const data = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      bio: req.body.bio,
      avatarUrl: req.body.avatarUrl,
      resumeUrl: req.body.resumeUrl,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      githubUrl: req.body.githubUrl,
      linkedinUrl: req.body.linkedinUrl,
      twitterUrl: req.body.twitterUrl,
      yearsExperience: req.body.yearsExperience !== undefined ? parseInt(req.body.yearsExperience, 10) : undefined,
      completedProjects: req.body.completedProjects !== undefined ? parseInt(req.body.completedProjects, 10) : undefined,
      happyClients: req.body.happyClients !== undefined ? parseInt(req.body.happyClients, 10) : undefined
    };

    let result;
    if (existing) {
      result = await prisma.about.update({
        where: { id: existing.id },
        data
      });
    } else {
      result = await prisma.about.create({
        data: {
          title: data.title || 'Software Engineer',
          bio: data.bio || 'Bio',
          ...data
        }
      });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAbout,
  updateAbout
};

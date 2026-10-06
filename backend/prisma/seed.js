const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Seed Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      email: 'admin@portfolio.com',
      password: adminPassword,
      name: 'Portfolio Admin',
      role: 'ADMIN'
    }
  });
  console.log(`👤 Admin created: ${admin.email}`);

  // 2. Seed About Profile
  const existingAbout = await prisma.about.findFirst();
  if (!existingAbout) {
    await prisma.about.create({
      data: {
        title: 'Full Stack Software Engineer & System Architect',
        subtitle: 'Specializing in high-performance web applications, scalable APIs & modern frontend architectures.',
        bio: 'I am a passionate software engineer with 4+ years of hands-on experience building modern, responsive web applications and scalable backends. I focus on clean architecture, intuitive UX, and robust system design. Let us bring great ideas to life.',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
        resumeUrl: 'https://example.com/resume.pdf',
        email: 'alex.developer@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA / Remote',
        githubUrl: 'https://github.com',
        linkedinUrl: 'https://linkedin.com',
        twitterUrl: 'https://twitter.com',
        yearsExperience: 4,
        completedProjects: 28,
        happyClients: 19
      }
    });
    console.log('ℹ️ About profile created');
  }

  // 3. Seed Skills
  const skillsCount = await prisma.skill.count();
  if (skillsCount === 0) {
    await prisma.skill.createMany({
      data: [
        { name: 'React.js / Next.js', category: 'Frontend', proficiency: 95, order: 1 },
        { name: 'TypeScript & JavaScript (ESNext)', category: 'Frontend', proficiency: 92, order: 2 },
        { name: 'Tailwind CSS & Modern CSS', category: 'Frontend', proficiency: 95, order: 3 },
        { name: 'Node.js & Express', category: 'Backend', proficiency: 90, order: 4 },
        { name: 'REST APIs & GraphQL', category: 'Backend', proficiency: 88, order: 5 },
        { name: 'PostgreSQL & SQL Design', category: 'Database', proficiency: 85, order: 6 },
        { name: 'Prisma ORM & Supabase', category: 'Database', proficiency: 88, order: 7 },
        { name: 'Docker & Microservices', category: 'DevOps/Tools', proficiency: 78, order: 8 },
        { name: 'Git, CI/CD & Cloud Deployment', category: 'DevOps/Tools', proficiency: 85, order: 9 }
      ]
    });
    console.log('⚡ Skills seeded');
  }

  // 4. Seed Services
  const servicesCount = await prisma.service.count();
  if (servicesCount === 0) {
    await prisma.service.createMany({
      data: [
        {
          title: 'Full Stack Web Development',
          description: 'End-to-end responsive web applications built with modern React, Node.js, and PostgreSQL for maximum performance.',
          icon: 'Code',
          price: 'Starting at $1,500',
          order: 1
        },
        {
          title: 'Custom Headless CMS & APIs',
          description: 'Tailor-made backend architectures, authenticated RESTful endpoints, and custom content dashboards from scratch.',
          icon: 'Database',
          price: 'Starting at $1,200',
          order: 2
        },
        {
          title: 'UI/UX & Frontend Optimization',
          description: 'Blazing fast, pixel-perfect, accessible user interfaces with Tailwind CSS, sleek transitions, and responsive design.',
          icon: 'Layout',
          price: 'Starting at $800',
          order: 3
        }
      ]
    });
    console.log('🛠️ Services seeded');
  }

  // 5. Seed Projects
  const projectsCount = await prisma.project.count();
  if (projectsCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: 'CloudFlow - Collaborative Task Engine',
          description: 'A real-time workspace platform for agile teams with dynamic boards, live updates, and team analytics.',
          longDescription: 'Engineered a highly responsive fullstack workspace app supporting drag-and-drop kanban boards, live socket updates, role-based access control, and PostgreSQL data persistence.',
          imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
          demoUrl: 'https://example.com/demo/cloudflow',
          githubUrl: 'https://github.com/example/cloudflow',
          tags: 'React,Tailwind CSS,Node.js,PostgreSQL,Prisma',
          featured: true,
          order: 1
        },
        {
          title: 'FinMetrics - SaaS Financial Analytics Dashboard',
          description: 'Interactive financial metrics tracking platform with real-time currency conversions, charts, and invoice automation.',
          longDescription: 'Built with Vite, React, ChartJS and Express REST APIs. Delivers interactive cash flow forecasts, subscription churn calculations, and automated monthly reporting.',
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
          demoUrl: 'https://example.com/demo/finmetrics',
          githubUrl: 'https://github.com/example/finmetrics',
          tags: 'React,TypeScript,Chart.js,Express,Tailwind',
          featured: true,
          order: 2
        },
        {
          title: 'PulseStore - Headless E-Commerce Experience',
          description: 'High conversion headless shopping storefront with lightning-fast search, filtering, and instant checkout flow.',
          longDescription: 'Created a modular e-commerce frontend communicating with a custom Node.js backend. Features optimistic UI cart updates, Stripe checkout integration, and sub-second page transitions.',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
          demoUrl: 'https://example.com/demo/pulsestore',
          githubUrl: 'https://github.com/example/pulsestore',
          tags: 'React,Tailwind CSS,Node.js,PostgreSQL,Stripe',
          featured: true,
          order: 3
        }
      ]
    });
    console.log('🚀 Projects seeded');
  }

  // 6. Seed Experiences
  const experiencesCount = await prisma.experience.count();
  if (experiencesCount === 0) {
    await prisma.experience.createMany({
      data: [
        {
          role: 'Senior Full Stack Engineer',
          company: 'Nexus Tech Systems',
          companyUrl: 'https://example.com',
          location: 'San Francisco, CA',
          startDate: '2023 - Present',
          endDate: 'Present',
          current: true,
          description: 'Lead developer for enterprise SaaS platform. Migrated monolithic frontend to React and decoupled microservices, improving load times by 45%.',
          order: 1
        },
        {
          role: 'Full Stack Web Developer',
          company: 'Hyperion Digital Agency',
          companyUrl: 'https://example.com',
          location: 'New York, NY',
          startDate: '2021',
          endDate: '2023',
          current: false,
          description: 'Constructed custom CMS backends, RESTful APIs, and animated responsive client portals for over 15 high-growth startup clients.',
          order: 2
        },
        {
          role: 'Frontend Engineering Intern',
          company: 'Vanguard Labs',
          companyUrl: 'https://example.com',
          location: 'Austin, TX',
          startDate: '2020',
          endDate: '2021',
          current: false,
          description: 'Developed interactive dashboards, optimized mobile accessibility, and authored reusable UI design system components.',
          order: 3
        }
      ]
    });
    console.log('💼 Experience seeded');
  }

  // 7. Seed Testimonials
  const testimonialsCount = await prisma.testimonial.count();
  if (testimonialsCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          clientName: 'Sarah Jenkins',
          position: 'Chief Product Officer',
          company: 'Elevate Health',
          quote: 'Delivered our entire dashboard two weeks ahead of schedule. The code was exceptionally well-structured, maintainable, and the UI was loved by all stakeholders.',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
          rating: 5,
          order: 1
        },
        {
          clientName: 'David Chen',
          position: 'Founder & CEO',
          company: 'MetricFlow SaaS',
          quote: 'Building our custom CMS from scratch with this architecture gave us total ownership over our content without paying monthly SaaS fees. Incredible engineering quality!',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
          rating: 5,
          order: 2
        }
      ]
    });
    console.log('💬 Testimonials seeded');
  }

  // 8. Seed Blogs
  const blogsCount = await prisma.blog.count();
  if (blogsCount === 0) {
    await prisma.blog.createMany({
      data: [
        {
          title: 'Architecting Custom Headless CMS with Express and PostgreSQL',
          slug: 'architecting-custom-headless-cms',
          excerpt: 'Why building your own CMS from scratch can offer unparalleled freedom, security, and zero vendor lock-in for modern web developers.',
          content: 'Building a custom CMS allows developers full control over database modeling, authentication mechanisms, and API contracts. In this article, we explore the step-by-step structure of separating admin controls from public presentation layers...',
          coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
          category: 'Architecture',
          published: true,
          readTime: '6 min read'
        },
        {
          title: 'Mastering Modern Fullstack Performance in 2026',
          slug: 'mastering-modern-fullstack-performance',
          excerpt: 'A comprehensive guide on code splitting, database indexing, caching strategies, and asset optimization for instantaneous load times.',
          content: 'Speed is not a feature; it is a foundational requirement. We break down practical optimizations across the frontend bundle, API response latency, and database query tuning.',
          coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80',
          category: 'Performance',
          published: true,
          readTime: '4 min read'
        }
      ]
    });
    console.log('📝 Blogs seeded');
  }

  // 9. Seed Sample Contact Message
  const messagesCount = await prisma.message.count();
  if (messagesCount === 0) {
    await prisma.message.create({
      data: {
        name: 'Jordan Smith',
        email: 'jordan@example.com',
        subject: 'Project Collaboration Inquiry',
        message: 'Hello! I reviewed your portfolio and would love to discuss building a custom web application for our venture.',
        read: false
      }
    });
    console.log('📬 Initial message seeded');
  }

  console.log('✅ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

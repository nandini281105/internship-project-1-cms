import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const STATIC_BASE = import.meta.env.VITE_STATIC_BASE_URL || 'http://localhost:5000';

const client = axios.create({
  baseURL: API_BASE,
  timeout: 6000,
});

// Format media/image URLs (handles relative /uploads/ vs full URLs)
export const resolveImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  return `${STATIC_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
};

// Fallback initial data in case backend is offline or starting up
const fallbackData = {
  about: {
    title: 'Full Stack Software Engineer & System Architect',
    subtitle: 'Specializing in high-performance web applications, scalable APIs & modern frontend architectures.',
    bio: 'I am a passionate software engineer with 4+ years of hands-on experience building modern, responsive web applications and scalable backends. I focus on clean architecture, intuitive UX, and robust system design. Let us bring great ideas to life.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    resumeUrl: '#',
    email: 'alex.developer@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA / Remote',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    twitterUrl: 'https://twitter.com',
    yearsExperience: 4,
    completedProjects: 28,
    happyClients: 19,
  },
  skills: [
    { id: '1', name: 'React.js / Next.js', category: 'Frontend', proficiency: 95 },
    { id: '2', name: 'TypeScript & JavaScript', category: 'Frontend', proficiency: 92 },
    { id: '3', name: 'Tailwind CSS & UI Systems', category: 'Frontend', proficiency: 95 },
    { id: '4', name: 'Node.js & Express.js', category: 'Backend', proficiency: 90 },
    { id: '5', name: 'REST APIs & GraphQL', category: 'Backend', proficiency: 88 },
    { id: '6', name: 'PostgreSQL & SQL Design', category: 'Database', proficiency: 85 },
    { id: '7', name: 'Prisma ORM & Supabase', category: 'Database', proficiency: 88 },
    { id: '8', name: 'Docker & Microservices', category: 'DevOps/Tools', proficiency: 78 },
    { id: '9', name: 'Git, CI/CD & Deployments', category: 'DevOps/Tools', proficiency: 85 },
  ],
  services: [
    {
      id: '1',
      title: 'Full Stack Web Development',
      description: 'End-to-end responsive web applications built with modern React, Node.js, and PostgreSQL for maximum performance.',
      icon: 'Code',
      price: 'Starting at $1,500',
    },
    {
      id: '2',
      title: 'Custom Headless CMS & APIs',
      description: 'Tailor-made backend architectures, authenticated RESTful endpoints, and custom content dashboards from scratch.',
      icon: 'Database',
      price: 'Starting at $1,200',
    },
    {
      id: '3',
      title: 'UI/UX & Frontend Optimization',
      description: 'Blazing fast, pixel-perfect, accessible user interfaces with Tailwind CSS, sleek transitions, and responsive design.',
      icon: 'Layout',
      price: 'Starting at $800',
    },
  ],
  projects: [
    {
      id: '1',
      title: 'CloudFlow - Collaborative Task Engine',
      description: 'A real-time workspace platform for agile teams with dynamic boards, live updates, and team analytics.',
      longDescription: 'Engineered a highly responsive fullstack workspace app supporting drag-and-drop kanban boards, live socket updates, role-based access control, and PostgreSQL data persistence.',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
      demoUrl: 'https://example.com/demo/cloudflow',
      githubUrl: 'https://github.com/example/cloudflow',
      tags: 'React,Tailwind CSS,Node.js,PostgreSQL,Prisma',
      featured: true,
    },
    {
      id: '2',
      title: 'FinMetrics - SaaS Financial Analytics Dashboard',
      description: 'Interactive financial metrics tracking platform with real-time currency conversions, charts, and invoice automation.',
      longDescription: 'Built with Vite, React, ChartJS and Express REST APIs. Delivers interactive cash flow forecasts, subscription churn calculations, and automated monthly reporting.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      demoUrl: 'https://example.com/demo/finmetrics',
      githubUrl: 'https://github.com/example/finmetrics',
      tags: 'React,TypeScript,Chart.js,Express,Tailwind',
      featured: true,
    },
    {
      id: '3',
      title: 'PulseStore - Headless E-Commerce Experience',
      description: 'High conversion headless shopping storefront with lightning-fast search, filtering, and instant checkout flow.',
      longDescription: 'Created a modular e-commerce frontend communicating with a custom Node.js backend. Features optimistic UI cart updates, Stripe checkout integration, and sub-second page transitions.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      demoUrl: 'https://example.com/demo/pulsestore',
      githubUrl: 'https://github.com/example/pulsestore',
      tags: 'React,Tailwind CSS,Node.js,PostgreSQL,Stripe',
      featured: true,
    },
  ],
  experiences: [
    {
      id: '1',
      role: 'Senior Full Stack Engineer',
      company: 'Nexus Tech Systems',
      location: 'San Francisco, CA',
      startDate: '2023 - Present',
      endDate: 'Present',
      current: true,
      description: 'Lead developer for enterprise SaaS platform. Migrated monolithic frontend to React and decoupled microservices, improving load times by 45%.',
    },
    {
      id: '2',
      role: 'Full Stack Web Developer',
      company: 'Hyperion Digital Agency',
      location: 'New York, NY',
      startDate: '2021',
      endDate: '2023',
      current: false,
      description: 'Constructed custom CMS backends, RESTful APIs, and animated responsive client portals for over 15 high-growth startup clients.',
    },
    {
      id: '3',
      role: 'Frontend Engineering Intern',
      company: 'Vanguard Labs',
      location: 'Austin, TX',
      startDate: '2020',
      endDate: '2021',
      current: false,
      description: 'Developed interactive dashboards, optimized mobile accessibility, and authored reusable UI design system components.',
    },
  ],
  testimonials: [
    {
      id: '1',
      clientName: 'Sarah Jenkins',
      position: 'Chief Product Officer',
      company: 'Elevate Health',
      quote: 'Delivered our entire dashboard two weeks ahead of schedule. The code was exceptionally well-structured, maintainable, and the UI was loved by all stakeholders.',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      id: '2',
      clientName: 'David Chen',
      position: 'Founder & CEO',
      company: 'MetricFlow SaaS',
      quote: 'Building our custom CMS from scratch with this architecture gave us total ownership over our content without paying monthly SaaS fees. Incredible engineering quality!',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      rating: 5,
    },
  ],
  blogs: [
    {
      id: '1',
      title: 'Architecting Custom Headless CMS with Express and PostgreSQL',
      slug: 'architecting-custom-headless-cms',
      excerpt: 'Why building your own CMS from scratch can offer unparalleled freedom, security, and zero vendor lock-in for modern web developers.',
      content: 'Building a custom CMS allows developers full control over database modeling, authentication mechanisms, and API contracts. In this article, we explore the step-by-step structure of separating admin controls from public presentation layers...',
      coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      category: 'Architecture',
      readTime: '6 min read',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Mastering Modern Fullstack Performance in 2026',
      slug: 'mastering-modern-fullstack-performance',
      excerpt: 'A comprehensive guide on code splitting, database indexing, caching strategies, and asset optimization for instantaneous load times.',
      content: 'Speed is not a feature; it is a foundational requirement. We break down practical optimizations across the frontend bundle, API response latency, and database query tuning.',
      coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80',
      category: 'Performance',
      readTime: '4 min read',
      createdAt: new Date().toISOString(),
    },
  ],
};

export const fetchAbout = async () => {
  try {
    const res = await client.get('/about');
    return res.data?.data || fallbackData.about;
  } catch (err) {
    return fallbackData.about;
  }
};

export const fetchSkills = async () => {
  try {
    const res = await client.get('/skills');
    return res.data?.data?.length ? res.data.data : fallbackData.skills;
  } catch (err) {
    return fallbackData.skills;
  }
};

export const fetchProjects = async () => {
  try {
    const res = await client.get('/projects');
    return res.data?.data?.length ? res.data.data : fallbackData.projects;
  } catch (err) {
    return fallbackData.projects;
  }
};

export const fetchServices = async () => {
  try {
    const res = await client.get('/services');
    return res.data?.data?.length ? res.data.data : fallbackData.services;
  } catch (err) {
    return fallbackData.services;
  }
};

export const fetchExperiences = async () => {
  try {
    const res = await client.get('/experience');
    return res.data?.data?.length ? res.data.data : fallbackData.experiences;
  } catch (err) {
    return fallbackData.experiences;
  }
};

export const fetchTestimonials = async () => {
  try {
    const res = await client.get('/testimonials');
    return res.data?.data?.length ? res.data.data : fallbackData.testimonials;
  } catch (err) {
    return fallbackData.testimonials;
  }
};

export const fetchBlogs = async () => {
  try {
    const res = await client.get('/blogs');
    return res.data?.data?.length ? res.data.data : fallbackData.blogs;
  } catch (err) {
    return fallbackData.blogs;
  }
};

export const submitContactForm = async (formData) => {
  const res = await client.post('/contact', formData);
  return res.data;
};

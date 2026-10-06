import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const STATIC_BASE = import.meta.env.VITE_STATIC_BASE_URL || 'http://localhost:5000';

export const adminClient = axios.create({
  baseURL: API_BASE,
});

// Request interceptor to attach JWT token
adminClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cms_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to catch 401 Unauthorized
adminClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('cms_token');
      localStorage.removeItem('cms_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const resolveImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  return `${STATIC_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
};

// Auth
export const loginApi = async (email, password) => {
  const res = await adminClient.post('/auth/login', { email, password });
  return res.data;
};

export const getMeApi = async () => {
  const res = await adminClient.get('/auth/me');
  return res.data;
};

// Stats
export const getStatsApi = async () => {
  const res = await adminClient.get('/stats');
  return res.data;
};

// About
export const getAboutApi = async () => {
  const res = await adminClient.get('/about');
  return res.data;
};

export const updateAboutApi = async (data) => {
  const res = await adminClient.put('/about', data);
  return res.data;
};

// Skills
export const getSkillsApi = async () => {
  const res = await adminClient.get('/skills');
  return res.data;
};

export const createSkillApi = async (data) => {
  const res = await adminClient.post('/skills', data);
  return res.data;
};

export const updateSkillApi = async (id, data) => {
  const res = await adminClient.put(`/skills/${id}`, data);
  return res.data;
};

export const deleteSkillApi = async (id) => {
  const res = await adminClient.delete(`/skills/${id}`);
  return res.data;
};

// Projects
export const getProjectsApi = async () => {
  const res = await adminClient.get('/projects');
  return res.data;
};

export const createProjectApi = async (data) => {
  const res = await adminClient.post('/projects', data);
  return res.data;
};

export const updateProjectApi = async (id, data) => {
  const res = await adminClient.put(`/projects/${id}`, data);
  return res.data;
};

export const deleteProjectApi = async (id) => {
  const res = await adminClient.delete(`/projects/${id}`);
  return res.data;
};

// Blogs
export const getBlogsApi = async () => {
  const res = await adminClient.get('/blogs?all=true');
  return res.data;
};

export const createBlogApi = async (data) => {
  const res = await adminClient.post('/blogs', data);
  return res.data;
};

export const updateBlogApi = async (id, data) => {
  const res = await adminClient.put(`/blogs/${id}`, data);
  return res.data;
};

export const deleteBlogApi = async (id) => {
  const res = await adminClient.delete(`/blogs/${id}`);
  return res.data;
};

// Experience
export const getExperienceApi = async () => {
  const res = await adminClient.get('/experience');
  return res.data;
};

export const createExperienceApi = async (data) => {
  const res = await adminClient.post('/experience', data);
  return res.data;
};

export const updateExperienceApi = async (id, data) => {
  const res = await adminClient.put(`/experience/${id}`, data);
  return res.data;
};

export const deleteExperienceApi = async (id) => {
  const res = await adminClient.delete(`/experience/${id}`);
  return res.data;
};

// Testimonials
export const getTestimonialsApi = async () => {
  const res = await adminClient.get('/testimonials');
  return res.data;
};

export const createTestimonialApi = async (data) => {
  const res = await adminClient.post('/testimonials', data);
  return res.data;
};

export const updateTestimonialApi = async (id, data) => {
  const res = await adminClient.put(`/testimonials/${id}`, data);
  return res.data;
};

export const deleteTestimonialApi = async (id) => {
  const res = await adminClient.delete(`/testimonials/${id}`);
  return res.data;
};

// Services
export const getServicesApi = async () => {
  const res = await adminClient.get('/services');
  return res.data;
};

export const createServiceApi = async (data) => {
  const res = await adminClient.post('/services', data);
  return res.data;
};

export const updateServiceApi = async (id, data) => {
  const res = await adminClient.put(`/services/${id}`, data);
  return res.data;
};

export const deleteServiceApi = async (id) => {
  const res = await adminClient.delete(`/services/${id}`);
  return res.data;
};

// Messages
export const getMessagesApi = async () => {
  const res = await adminClient.get('/messages');
  return res.data;
};

export const markMessageReadApi = async (id, read) => {
  const res = await adminClient.patch(`/messages/${id}/read`, { read });
  return res.data;
};

export const deleteMessageApi = async (id) => {
  const res = await adminClient.delete(`/messages/${id}`);
  return res.data;
};

// Uploads
export const uploadFileApi = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await adminClient.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const getMediaApi = async () => {
  const res = await adminClient.get('/media');
  return res.data;
};

export const deleteMediaApi = async (id) => {
  const res = await adminClient.delete(`/media/${id}`);
  return res.data;
};

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/agrotech-api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Services API
export const getServices = async (params = {}) => {
  const response = await api.get('/services.php', { params });
  return response.data;
};

export const getServiceBySlug = async (slug) => {
  const response = await api.get(`/services.php?slug=${slug}`);
  return response.data;
};

export const getFeaturedServices = async () => {
  const response = await api.get('/services.php?featured=true');
  return response.data;
};

// Categories API
export const getCategories = async () => {
  const response = await api.get('/categories.php');
  return response.data;
};

export const getCategoryBySlug = async (slug) => {
  const response = await api.get(`/categories.php?slug=${slug}`);
  return response.data;
};

// Company Info API
export const getCompanyInfo = async () => {
  const response = await api.get('/company.php');
  return response.data;
};

// Team API
export const getTeamMembers = async () => {
  const response = await api.get('/team.php');
  return response.data;
};

// Testimonials API
export const getTestimonials = async () => {
  const response = await api.get('/testimonials.php');
  return response.data;
};

// Statistics API
export const getStatistics = async () => {
  const response = await api.get('/statistics.php');
  return response.data;
};

// Hero Slides API
export const getHeroSlides = async () => {
  const response = await api.get('/hero-slides.php');
  return response.data;
};

// Contact Form Submission
export const submitContactForm = async (data) => {
  const response = await api.post('/contact.php', data);
  return response.data;
};

// Service Inquiry / Join Form Submission
export const submitServiceInquiry = async (data) => {
  const response = await api.post('/service-inquiry.php', data);
  return response.data;
};

// Newsletter Subscription
export const subscribeNewsletter = async (email) => {
  const response = await api.post('/newsletter.php', { email });
  return response.data;
};

export default api;

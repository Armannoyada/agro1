import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/Agro/agro1/backend';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = async (username, password) => {
  const response = await api.post('/auth.php', { action: 'login', username, password });
  return response.data;
};

// Services API
export const getServices = async () => {
  const response = await api.get('/services.php');
  return response.data;
};

export const getService = async (id) => {
  const response = await api.get(`/services.php?id=${id}`);
  return response.data;
};

export const createService = async (data) => {
  const response = await api.post('/services.php', data);
  return response.data;
};

export const updateService = async (id, data) => {
  const response = await api.put('/services.php', { id, ...data });
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete('/services.php', { data: { id } });
  return response.data;
};

// Categories API
export const getCategories = async () => {
  const response = await api.get('/categories.php');
  return response.data;
};

export const createCategory = async (data) => {
  const response = await api.post('/categories.php', data);
  return response.data;
};

export const updateCategory = async (id, data) => {
  const response = await api.put('/categories.php', { id, ...data });
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete('/categories.php', { data: { id } });
  return response.data;
};

// Service Inquiries API
export const getServiceInquiries = async () => {
  const response = await api.get('/service-inquiry.php');
  return response.data;
};

export const updateInquiryStatus = async (id, status) => {
  const response = await api.put('/service-inquiry.php', { id, status });
  return response.data;
};

// Contacts API
export const getContacts = async () => {
  const response = await api.get('/contact.php');
  return response.data;
};

export const updateContactStatus = async (id, status) => {
  const response = await api.put('/contact.php', { id, status });
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await api.delete('/contact.php', { data: { id } });
  return response.data;
};

// Testimonials API
export const getTestimonials = async () => {
  const response = await api.get('/testimonials.php');
  return response.data;
};

export const createTestimonial = async (data) => {
  const response = await api.post('/testimonials.php', data);
  return response.data;
};

export const updateTestimonial = async (id, data) => {
  const response = await api.put('/testimonials.php', { id, ...data });
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await api.delete('/testimonials.php', { data: { id } });
  return response.data;
};

// Team API
export const getTeam = async () => {
  const response = await api.get('/team.php');
  return response.data;
};

export const createTeamMember = async (data) => {
  const response = await api.post('/team.php', data);
  return response.data;
};

export const updateTeamMember = async (id, data) => {
  const response = await api.put('/team.php', { id, ...data });
  return response.data;
};

export const deleteTeamMember = async (id) => {
  const response = await api.delete('/team.php', { data: { id } });
  return response.data;
};

// Company Info API
export const getCompanyInfo = async () => {
  const response = await api.get('/company.php');
  return response.data;
};

export const updateCompanyInfo = async (data) => {
  const response = await api.put('/company.php', data);
  return response.data;
};

// Statistics API
export const getStatistics = async () => {
  const response = await api.get('/statistics.php');
  return response.data;
};

export const createStatistic = async (data) => {
  const response = await api.post('/statistics.php', data);
  return response.data;
};

export const updateStatistic = async (id, data) => {
  const response = await api.put('/statistics.php', { id, ...data });
  return response.data;
};

export const deleteStatistic = async (id) => {
  const response = await api.delete('/statistics.php', { data: { id } });
  return response.data;
};

export default api;

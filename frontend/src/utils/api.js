import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');
export const getUsers = () => API.get('/auth/users');

// Bookings
export const createBooking = (data) => API.post('/bookings', data);
export const getBookings = (params) => API.get('/bookings', { params });
export const updateBooking = (id, data) => API.put(`/bookings/${id}`, data);
export const deleteBooking = (id) => API.delete(`/bookings/${id}`);
export const getDashboardStats = () => API.get('/bookings/stats');
export const getMyBookings = () => API.get('/bookings/my');

// Testimonials
export const getTestimonials = () => API.get('/testimonials');
export const getAllTestimonials = () => API.get('/testimonials/all');
export const createTestimonial = (data) => API.post('/testimonials', data);
export const updateTestimonial = (id, data) => API.put(`/testimonials/${id}`, data);
export const deleteTestimonial = (id) => API.delete(`/testimonials/${id}`);

// Gallery
export const getGallery = (params) => API.get('/gallery', { params });
export const uploadMedia = (data) => API.post('/gallery', data, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const updateMedia = (id, data) => API.put(`/gallery/${id}`, data);
export const deleteMedia = (id) => API.delete(`/gallery/${id}`);

// Contacts
export const submitContact = (data) => API.post('/contacts', data);
export const getContacts = () => API.get('/contacts');
export const markContactRead = (id) => API.put(`/contacts/${id}/read`);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);

export default API;

// /src/api/user.js
import api from './axiosInstance';

export const getMe = () => api.get('/users/me');
export const updateMe = (data) => api.patch('/users/me', data);
export const getUserById = (id) => api.get(`/users/${id}`);
export const searchUsers = (params) => api.get('/users', { params });
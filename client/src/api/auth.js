// src/api/auth.js
import axios from './axiosInstance';

export const login = async (email, password) => {
  const res = await axios.post('/auth/login', { email, password });
  return res.data;
};

export const register = async (formData) => {
  const res = await axios.post('/auth/register', formData);
  return res.data;
};

export const getProfile = async (token) => {
  const res = await axios.get('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend API root
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false // change to true if using cookies
});

export default axiosInstance;
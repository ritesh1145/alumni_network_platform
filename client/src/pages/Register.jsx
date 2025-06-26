// src/pages/Register.jsx
import React, { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    graduationYear: '',
    degree: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(formData);
      console.log('Registration successful:', data);
      navigate('/login'); // redirect after successful registration
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || 'Registration failed');
        console.error('Error response:', err.response.data);
      } else {
        alert('Unexpected error occurred');
        console.error('Unexpected error:', err.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2" />
        <input name="graduationYear" placeholder="Graduation Year" onChange={handleChange} className="w-full border p-2" />
        <input name="degree" placeholder="Degree" onChange={handleChange} className="w-full border p-2" />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
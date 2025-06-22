const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security headers
app.use(helmet());

// CORS for frontend/backend communication
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Rate limiter (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes')); // ✅ Add this line
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));



// Base Route
app.get('/', (req, res) => {
  res.send('Alumni Network Platform API is running...');
});

// Global Error Handler (Optional)
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

module.exports = app;

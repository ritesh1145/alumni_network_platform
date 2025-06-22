const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

// Protect all admin routes
router.use(protect, isAdmin);

// Admin-only endpoints
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);
router.delete('/events/:id', adminController.deleteEvent);
router.delete('/jobs/:id', adminController.deleteJob);

module.exports = router;

const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);

// Protected routes
router.post('/', protect, jobController.createJob);
router.put('/:id', protect, jobController.updateJob);
router.delete('/:id', protect, jobController.deleteJob);

module.exports = router;

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

// Protected Routes
router.post('/', protect, eventController.createEvent);
router.put('/:id', protect, eventController.updateEvent);
router.delete('/:id', protect, eventController.deleteEvent);

module.exports = router;

const rsvpController = require('../controllers/rsvpController');

router.post('/:eventId/rsvp', protect, rsvpController.rsvpToEvent);
router.get('/rsvps/me', protect, rsvpController.getMyRSVPs);

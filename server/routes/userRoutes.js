const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/',          userController.listUsers);           // public list/search
router.get('/:id',       userController.getUserById);         // public profile
router.get('/me',  protect, userController.getMe);            // MUST come before '/:id'
router.patch('/me', protect, userController.updateMe);

module.exports = router;

const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
  resetPassword,
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword); // Reset password route

// Protected Routes
router.get('/profile', protect, getUserProfile);

module.exports = router;

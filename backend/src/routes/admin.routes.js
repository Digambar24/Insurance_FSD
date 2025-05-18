const express = require('express');
const router = express.Router();
const {
  getAdminSummary,
  getAllUsers,
  deleteUser,
  getAllPurchases, // Add this import for the new controller function
} = require('../controllers/admin.controller');

const { protect, admin } = require('../middleware/authMiddleware');

// Summary route
router.get('/summary', protect, admin, getAdminSummary);

// User management routes
router.get('/users', protect, admin, getAllUsers);
router.delete('/users/:id', protect, admin, deleteUser);

// Admin route for fetching all purchases
router.get('/purchases', protect, admin, getAllPurchases); // New route for purchases

module.exports = router;

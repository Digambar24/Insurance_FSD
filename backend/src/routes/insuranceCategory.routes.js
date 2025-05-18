const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory
} = require('../controllers/insuranceCategory.controller'); // Corrected import
const { protect, admin } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(getCategories)
  .post(protect, admin, createCategory);

module.exports = router;

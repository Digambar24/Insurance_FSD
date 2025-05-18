const express = require('express');
const router = express.Router();
const {
  getAllInsurances,
  getInsurancesByCategory,
  getInsurancesBySubCategory,
  getAllCategories,  // Add the new import
} = require('../controllers/insurance.controller');

// Existing routes
router.get('/', getAllInsurances);
router.get('/category/:category', getInsurancesByCategory);
router.get('/subcategory/:subCategory', getInsurancesBySubCategory);

// New route for fetching distinct categories
router.get('/categories', getAllCategories);  // Add this new route

module.exports = router;

const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');

const {
  getAllInsuranceCompanies,
  getInsuranceCompaniesByCategory,
  getInsuranceCompaniesByType,
  createInsuranceCompany,
  updateInsuranceCompany,
  deleteInsuranceCompany,
} = require('../controllers/insuranceCompany.controller');

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// Handle logo and brochure file uploads
const uploadFields = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'brochure', maxCount: 1 },
]);

// ----------------- Public Routes ------------------ //

// @route   GET /api/insurance-companies
router.get('/', getAllInsuranceCompanies);

// @route   GET /api/insurance-companies/category/:categoryId
router.get('/category/:categoryId', getInsuranceCompaniesByCategory);

// @route   GET /api/insurance-companies/type/:type
router.get('/type/:type', getInsuranceCompaniesByType);

// ---------------- Admin Protected Routes --------------- //

// @route   POST /api/insurance-companies
// @desc    Create a new insurance company (Admin only)
router.post('/', protect, adminOnly, uploadFields, createInsuranceCompany);

// @route   PUT /api/insurance-companies/:id
// @desc    Update an insurance company (Admin only)
router.put('/:id', protect, adminOnly, uploadFields, updateInsuranceCompany);

// @route   DELETE /api/insurance-companies/:id
// @desc    Delete an insurance company (Admin only)
router.delete('/:id', protect, adminOnly, deleteInsuranceCompany);

module.exports = router;

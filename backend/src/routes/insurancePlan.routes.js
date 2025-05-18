const express = require('express');
const router = express.Router();
const { createPlan, getPlansByCompany } = require('../controllers/insurancePlan.controller');
const { protect, admin } = require('../middleware/authMiddleware');

// Public - Get all plans for a specific company
router.get('/company/:companyId', getPlansByCompany);

// Private/Admin - Create a new plan
router.post('/', protect, admin, createPlan);

module.exports = router;

const InsurancePlan = require('../models/InsurancePlan.model');

// @desc    Create a new Insurance Plan
// @route   POST /api/plans
// @access  Private/Admin
const createPlan = async (req, res) => {
  const { name, coverageAmount, premiumAmount, description, companyId } = req.body;

  if (!name || !coverageAmount || !premiumAmount || !companyId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const plan = await InsurancePlan.create({
    name,
    coverageAmount,
    premiumAmount,
    description,
    company: companyId,
  });

  res.status(201).json(plan);
};

// @desc    Get Plans by Company
// @route   GET /api/plans/company/:companyId
// @access  Public
const getPlansByCompany = async (req, res) => {
  const plans = await InsurancePlan.find({ company: req.params.companyId });

  res.json(plans);
};

module.exports = { createPlan, getPlansByCompany };

const Insurance = require('../models/insurance.model');

// @desc    Get all insurance policies
// @route   GET /api/insurance
// @access  Public
const getAllInsurances = async (req, res) => {
  try {
    const insurances = await Insurance.find();
    res.json(insurances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get insurance policies by category
// @route   GET /api/insurance/category/:category
// @access  Public
const getInsurancesByCategory = async (req, res) => {
  try {
    const insurances = await Insurance.find({ category: req.params.category });
    res.json(insurances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get insurance policies by sub-category
// @route   GET /api/insurance/subcategory/:subCategory
// @access  Public
const getInsurancesBySubCategory = async (req, res) => {
  try {
    const insurances = await Insurance.find({ subCategory: req.params.subCategory });
    res.json(insurances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all unique insurance categories
// @route   GET /api/insurance/categories
// @access  Public
const getAllCategories = async (req, res) => {
  try {
    const categories = await Insurance.distinct('category');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
};

module.exports = {
  getAllInsurances,
  getInsurancesByCategory,
  getInsurancesBySubCategory,
  getAllCategories, // ✅
};

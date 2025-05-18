const InsuranceCategory = require('../models/InsuranceCategory.model');

// @desc    Get all categories
// @route   GET /api/insurance-categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await InsuranceCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve categories' });
  }
};

// @desc    Create a new category
// @route   POST /api/insurance-categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;

    if (!name || !icon) {
      return res.status(400).json({ message: 'Name and Icon are required' });
    }

    const exists = await InsuranceCategory.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new InsuranceCategory({ name, icon });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory
};

const User = require('../models/user.model');
const InsuranceCompany = require('../models/insuranceCompany.model');
const Purchase = require('../models/purchase.model');

// Summary: Total counts and revenue
const getAdminSummary = async (req, res) => {
  try {
    // Get total counts of users, companies, and policies
    const totalUsers = await User.countDocuments({});
    const totalCompanies = await InsuranceCompany.countDocuments({});
    const totalPolicies = await Purchase.countDocuments({});

    // Update the revenue aggregation to filter only 'paid' purchases
    const revenueResult = await Purchase.aggregate([
      { $match: { paymentStatus: 'paid' } }, // Filter for 'paid' purchases only
      { $group: { _id: null, totalRevenue: { $sum: '$premiumAmount' } } } // Sum up the premiumAmount
    ]);

    // Get total revenue, default to 0 if no paid purchases
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // Respond with the summary data
    res.json({
      totalUsers,
      totalCompanies,
      totalPolicies,
      totalRevenue,
    });
  } catch (error) {
    console.error('Admin summary error:', error);
    res.status(500).json({ message: 'Server error fetching admin summary' });
  }
};

// Fetch all users for the admin
const getAllUsers = async (req, res) => {
  try {
    // Fetch users and exclude password from the response
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

// Delete a user by their ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Delete the user
    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error deleting user' });
  }
};

// Fetch all purchases for admin
const getAllPurchases = async (req, res) => {
  try {
    // Fetch all purchases and populate user and insurance company details
    const purchases = await Purchase.find({})
      .populate('user', 'name email') // Populate user details (name, email)
      .populate({
        path: 'insurance',
        populate: {
          path: 'category', // This points to InsuranceCompany
          model: 'InsuranceCompany',
          select: 'name logoUrl', // Select fields you want to show
        },
      })
            .sort({ createdAt: -1 }); // Sort by creation date (most recent first)

    res.json(purchases); // Return the list of all purchases
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ message: 'Server error fetching purchases' });
  }
};

// Other necessary controller functions here...

module.exports = {
  getAdminSummary,
  getAllUsers,
  deleteUser,
  getAllPurchases, // Export the new function
  // Other functions you may need for handling insurance companies, etc.
};

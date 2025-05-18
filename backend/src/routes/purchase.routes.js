const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  purchaseInsurance,
  initiateRazorpayPayment,
  verifyPayment,
  getAllPurchases,
  getMyPurchases,
  getPurchaseStatus,
} = require('../controllers/purchase.controller');

// User: Purchase Insurance
router.post('/', protect, purchaseInsurance);

// Admin: Get All Purchases
router.get('/', protect, admin, getAllPurchases);

// User: Get My Purchases
router.get('/my', protect, getMyPurchases);

// Initiate Razorpay Payment for a Purchase
router.get('/:purchaseId/initiate-payment', protect, initiateRazorpayPayment);

// Get Payment Status of a Purchase
router.get('/:purchaseId/status', protect, getPurchaseStatus);


// Verify Razorpay Payment Signature
router.post('/verify-payment', protect, verifyPayment);

module.exports = router;

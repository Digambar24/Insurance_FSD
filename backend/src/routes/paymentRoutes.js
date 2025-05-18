const express = require('express');
const {
  getRazorpayKey,
  createOrder,
  purchaseInsurance,
  verifyPayment,
  updatePaymentStatus,
  getMyPurchases,
  getAllPurchases,
  getPaymentStatus,
  razorpayWebhookHandler,
} = require('../controllers/payment.controller');
const { protect, admin } = require('../middleware/authMiddleware');  // Assuming these middleware are implemented for auth

const router = express.Router();

// Public route: Get Razorpay public key
router.route('/razorpay-key').get(getRazorpayKey);

// Public route: Create Razorpay order
router.route('/create-order').post(protect, createOrder);

// Authenticated user route: Purchase insurance
router.route('/purchase').post(protect, purchaseInsurance);

// Authenticated user route: Verify payment
router.route('/verify-payment').post(protect, verifyPayment);

// Admin route: Update payment status manually
router.route('/update-payment-status/:purchaseId').put(protect, admin, updatePaymentStatus);

// Authenticated user route: Get user's purchases
router.route('/my-purchases').get(protect, getMyPurchases);

// Admin route: Get all purchases (filter by status if needed)
router.route('/all-purchases').get(protect, admin, getAllPurchases);

// Authenticated user/admin route: Get payment status of a purchase
router.route('/payment-status/:purchaseId').get(protect, getPaymentStatus);

// Razorpay Webhook (for payment updates)
router.route('/razorpay-webhook').post(razorpayWebhookHandler);

module.exports = router;

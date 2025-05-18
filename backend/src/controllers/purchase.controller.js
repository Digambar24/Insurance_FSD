const crypto = require('crypto');
const Razorpay = require('razorpay');
const Purchase = require('../models/purchase.model');
const Insurance = require('../models/insurance.model');

// ✅ User: Purchase Insurance
const purchaseInsurance = async (req, res, next) => {
  try {
    const { insuranceId, insuranceType, formData, amount } = req.body;

    if (!insuranceId || !insuranceType || !amount || !formData) {
      return res.status(400).json({ message: 'insuranceId, insuranceType, formData, and amount are required.' });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount provided.' });
    }

    const insurance = await Insurance.findById(insuranceId);
    if (!insurance) {
      return res.status(404).json({ message: 'Insurance not found' });
    }

    const purchase = new Purchase({
      user: req.user._id,
      insurance: insuranceId,
      insuranceType,
      formData,
      amount,
      paymentStatus: 'Pending',
    });

    const savedPurchase = await purchase.save();
    res.status(201).json(savedPurchase);
  } catch (error) {
    console.error('Error in purchaseInsurance:', error);
    next(error);
  }
};

// ✅ Initiate Razorpay Payment
const initiateRazorpayPayment = async (req, res, next) => {
  try {
    const { purchaseId } = req.params;

    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    if (purchase.paymentStatus !== 'Pending') {
      return res.status(400).json({ message: 'Payment already initiated or completed' });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET, // ✅ FIXED: Use correct env key
    });

    const order = await razorpay.orders.create({
      amount: purchase.amount * 100, // Razorpay expects amount in paisa
      currency: 'INR',
      receipt: `receipt_${purchase._id}`,
    });

    purchase.razorpayOrderId = order.id;
    await purchase.save();

    res.json({
      razorpayOrderId: order.id,
      amount: order.amount,
      currency: order.currency,
      purchaseId: purchase._id,
    });
  } catch (error) {
    console.error('Error in initiateRazorpayPayment:', error);
    next(error);
  }
};

// ✅ Verify Razorpay Payment
const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, purchaseId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !purchaseId) {
      return res.status(400).json({ message: 'Missing payment details' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET) // ✅ FIXED: Correct secret
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    if (isValid) {
      purchase.paymentStatus = 'Success';
      purchase.razorpayPaymentId = razorpay_payment_id;
      await purchase.save();
      return res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      purchase.paymentStatus = 'Failed';
      await purchase.save();
      return res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Error in verifyPayment:', error);
    next(error);
  }
};

// ✅ Admin: Update Payment Status
const updatePaymentStatus = async (req, res, next) => {
  try {
    const { purchaseId } = req.params;
    const { paymentStatus, razorpayOrderId, razorpayPaymentId, failureReason } = req.body;

    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    if (purchase.paymentStatus === 'Success') {
      return res.status(400).json({ message: 'Payment already marked successful' });
    }

    purchase.paymentStatus = paymentStatus;
    purchase.razorpayOrderId = razorpayOrderId;
    purchase.razorpayPaymentId = razorpayPaymentId;
    if (failureReason) purchase.failureReason = failureReason;

    const updatedPurchase = await purchase.save();
    res.json(updatedPurchase);
  } catch (error) {
    console.error('Error in updatePaymentStatus:', error);
    next(error);
  }
};

// ✅ Admin: Get All Purchases
const getAllPurchases = async (req, res, next) => {
  try {
    const query = req.query.status ? { paymentStatus: req.query.status } : {};

    const purchases = await Purchase.find(query)
      .populate('user', 'name email')
      .populate('insurance', 'name category')
      .sort({ createdAt: -1 });

    res.json(purchases);
  } catch (error) {
    console.error('Error in getAllPurchases:', error);
    next(error);
  }
};

// ✅ User: Get My Purchases
const getMyPurchases = async (req, res, next) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id })
      .populate('insurance', 'name category')
      .sort({ createdAt: -1 });

    res.json(purchases);
  } catch (error) {
    console.error('Error in getMyPurchases:', error);
    next(error);
  }
};

// ✅ Admin/User: Get Purchase Status
const getPurchaseStatus = async (req, res, next) => {
  try {
    const { purchaseId } = req.params;

    const purchase = await Purchase.findById(purchaseId)
      .populate('user', 'name email')
      .populate('insurance', 'name category');

    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    res.json(purchase);
  } catch (error) {
    console.error('Error in getPurchaseStatus:', error);
    next(error);
  }
};

module.exports = {
  purchaseInsurance,
  initiateRazorpayPayment,
  verifyPayment,
  updatePaymentStatus,
  getAllPurchases,
  getMyPurchases,
  getPurchaseStatus,
};

const Razorpay = require('razorpay');
const crypto = require('crypto');
const Purchase = require('../models/purchase.model');
const Insurance = require('../models/insurance.model');

// Razorpay instance
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. Get Razorpay Public Key
const getRazorpayKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};

// 2. Create Razorpay Order
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ message: 'Amount is required' });

    const options = {
      amount: amount * 100, // in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Razorpay order', error: error.message });
  }
};

// 3. Pre-create a purchase record (pending payment)
const purchaseInsurance = async (req, res, next) => {
  try {
    const { insuranceId, insuranceType, formData, amount } = req.body;

    if (!insuranceId || !insuranceType || amount === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const insurance = await Insurance.findById(insuranceId);
    if (!insurance) return res.status(404).json({ message: 'Insurance not found' });

    const purchase = new Purchase({
      user: req.user._id,
      insurance: insuranceId,
      insuranceType,
      formData,
      amount,
      paymentStatus: 'Pending',
    });

    const saved = await purchase.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

// 4. Verify Razorpay payment signature and update purchase status
const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, purchaseId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !purchaseId) {
      return res.status(400).json({ message: 'All payment details are required' });
    }

    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });

    // Idempotency check
    if (purchase.paymentStatus === 'Success') {
      return res.status(200).json({ message: 'Payment already verified' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      purchase.paymentStatus = 'Success';
      purchase.razorpayOrderId = razorpay_order_id;
      purchase.razorpayPaymentId = razorpay_payment_id;
      purchase.failureReason = '';
      await purchase.save();

      res.status(200).json({ message: 'Payment verified and saved successfully' });
    } else {
      purchase.paymentStatus = 'Failed';
      purchase.failureReason = 'Invalid signature';
      await purchase.save();

      res.status(400).json({ message: 'Invalid payment signature' });
    }
  } catch (error) {
    next(error);
  }
};

// 5. Manually update a payment record (admin)
const updatePaymentStatus = async (req, res, next) => {
  try {
    const { purchaseId } = req.params;
    const { paymentStatus, razorpayOrderId, razorpayPaymentId, failureReason } = req.body;

    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });

    if (purchase.paymentStatus === 'Success') {
      return res.status(400).json({ message: 'Payment already marked successful' });
    }

    purchase.paymentStatus = paymentStatus;
    purchase.razorpayOrderId = razorpayOrderId || purchase.razorpayOrderId;
    purchase.razorpayPaymentId = razorpayPaymentId || purchase.razorpayPaymentId;
    purchase.failureReason = failureReason || '';
    const updated = await purchase.save();

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// 6. Get logged-in user's purchases
const getMyPurchases = async (req, res, next) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id })
      .populate('insurance', 'name category')
      .sort({ createdAt: -1 });

    res.status(200).json(purchases);
  } catch (error) {
    next(error);
  }
};

// 7. Get all purchases (admin)
const getAllPurchases = async (req, res, next) => {
  try {
    const query = req.query.status ? { paymentStatus: req.query.status } : {};

    const purchases = await Purchase.find(query)
      .populate('user', 'name email')
      .populate('insurance', 'name category')
      .sort({ createdAt: -1 });

    res.status(200).json(purchases);
  } catch (error) {
    next(error);
  }
};

// 8. Get payment status by purchase ID
const getPaymentStatus = async (req, res, next) => {
  try {
    const { purchaseId } = req.params;

    const purchase = await Purchase.findById(purchaseId)
      .populate('user', 'name email role')
      .populate('insurance', 'name category');

    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });

    if (
      req.user.role !== 'admin' &&
      req.user._id.toString() !== purchase.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json({
      user: purchase.user.name,
      insurance: purchase.insurance.name,
      type: purchase.insuranceType,
      amount: purchase.amount,
      status: purchase.paymentStatus,
      razorpayOrderId: purchase.razorpayOrderId || null,
      razorpayPaymentId: purchase.razorpayPaymentId || null,
      failureReason: purchase.failureReason || null,
      purchasedAt: purchase.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

// 9. Razorpay Webhook Handler (optional)
const razorpayWebhookHandler = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    const body = JSON.stringify(req.body);
    const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');

    if (expected === signature) {
      console.log('✅ Webhook verified:', req.body.event);
      res.status(200).json({ received: true });
    } else {
      console.log('❌ Invalid Webhook signature');
      res.status(400).json({ message: 'Invalid webhook signature' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Webhook processing error', error: error.message });
  }
};

module.exports = {
  getRazorpayKey,
  createOrder,
  purchaseInsurance,
  verifyPayment,
  updatePaymentStatus,
  getMyPurchases,
  getAllPurchases,
  getPaymentStatus,
  razorpayWebhookHandler,
};

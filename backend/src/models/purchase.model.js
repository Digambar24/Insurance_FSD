const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    insurance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Insurance',
      required: true,
    },
    insuranceType: {
      type: String,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Success', 'Failed'],
      default: 'Pending',
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    failureReason: String, // New field to store failure reason
  },
  { timestamps: true }
);

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;

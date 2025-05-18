const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InsuranceCompany', // 🔗 Reference to company
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    coverageDetails: {
      type: String,
      required: true,
    },
    premium: {
      type: Number,
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
    },
    termsAndConditions: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'insurancecompanies',
  }
);

module.exports = mongoose.model('Insurance', insuranceSchema);

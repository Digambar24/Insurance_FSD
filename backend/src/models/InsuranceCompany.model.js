const mongoose = require('mongoose');

// Insurance Company Schema
const insuranceCompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '', // Optional
  },
  features: [
    {
      type: String,
    },
  ],
  claimProcess: {
    type: String,
    default: '',
  },
  faqs: [
    {
      question: { type: String },
      answer: { type: String },
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InsuranceCategory',
    required: true,
  },
  insuranceType: {
    type: String,
    enum: ['Health', 'Car', 'Bike', 'Life', 'Term', 'Investment'],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // Added for uploads
  logo: {
    type: String,
    default: '',
  },
  brochure: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const InsuranceCompany = mongoose.model('InsuranceCompany', insuranceCompanySchema);

module.exports = InsuranceCompany;

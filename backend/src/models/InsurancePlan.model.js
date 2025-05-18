const mongoose = require('mongoose');

const insurancePlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coverageAmount: {
    type: Number,
    required: true,
  },
  premiumAmount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InsuranceCompany',
    required: true,
  },
}, {
  timestamps: true,
});

const InsurancePlan = mongoose.model('InsurancePlan', insurancePlanSchema);

module.exports = InsurancePlan;

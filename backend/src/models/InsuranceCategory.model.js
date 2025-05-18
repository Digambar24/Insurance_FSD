const mongoose = require('mongoose');

const insuranceCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('InsuranceCategory', insuranceCategorySchema);

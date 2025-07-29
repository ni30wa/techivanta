const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String, // store icon name or URL
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String, // or you can use type: Number if you want single price
      required: true,
    },
    features: {
      type: [String], // array of feature strings
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);

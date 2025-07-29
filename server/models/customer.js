const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    mobileNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Invalid mobile number"],
    },
    whatsappNumber: {
      type: String,
      match: [/^\d{10}$/, "Invalid WhatsApp number"],
    },
    plan: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);

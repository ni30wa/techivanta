// models/Certificate.js
const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    email: String,
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    college: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      match: /^[6-9]\d{9}$/,
    },
    certificateType: {
      type: String,
      enum: ["Internship", "Training", "Workshop", "Achievement"],
      required: true,
    },
    position: String,
    duration: String,
    startDate: Date,
    endDate: Date,
    issuedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Auto-generate certificateId before saving
certificateSchema.pre("save", async function (next) {
  if (!this.certificateId) {
    const random = Math.floor(100000 + Math.random() * 900000);
    this.certificateId = `CT${random}`;
  }
  next();
});

module.exports = mongoose.model("Certificate", certificateSchema);

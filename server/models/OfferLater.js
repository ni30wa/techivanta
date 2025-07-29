// models/OfferLetter.js
const mongoose = require("mongoose");

const offerLetterSchema = new mongoose.Schema(
  {
    offerLetterId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
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
      required: true,
      match: /^[6-9]\d{9}$/,
    },
    offerPosition: {
      type: String,
      required: true,
    },
    studentType: {
      type: String,
      enum: ["Internship", "Training", "Full-Time"],
      required: true,
    },
    duration: {
      type: String,
      required: function () {
        return (
          this.studentType === "Internship" || this.studentType === "Training"
        );
      },
    },
    paidStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      required: function () {
        return this.studentType === "Internship";
      },
    },
    offerDate: {
      type: Date,
      required: true,
    },
    offerExpiryDate: {
      type: Date,
      default: function () {
        const expiry = new Date(this.offerDate);
        expiry.setDate(expiry.getDate() + 30);
        return expiry;
      },
    },
  },
  { timestamps: true }
);

// Auto-generate offerLetterId before saving
offerLetterSchema.pre("save", async function (next) {
  if (!this.offerLetterId) {
    const random = Math.floor(100000 + Math.random() * 900000);
    this.offerLetterId = `OL${random}`;
  }
  next();
});

module.exports = mongoose.model("OfferLetter", offerLetterSchema);

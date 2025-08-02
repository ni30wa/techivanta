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
      enum: ["Internship", "Training", "Workshop", "Full-Time"],
      required: true,
    },
    duration: {
      type: String,
      required: function () {
        return (
          this.studentType === "Internship" ||
          this.studentType === "Training" ||
          this.studentType === "Workshop"
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

// Auto-generate offerLetterId in format: TV-IN-YYMMOL01
offerLetterSchema.pre("validate", async function (next) {
  if (this.offerLetterId) return next();

  const now = new Date();
  const yy = String(now.getFullYear()).slice(2); // e.g., "25"
  const mm = String(now.getMonth() + 1).padStart(2, "0"); // e.g., "08"

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const count = await mongoose.models.OfferLetter.countDocuments({
    offerDate: { $gte: startOfMonth, $lte: endOfMonth },
  });

  const serial = String(count + 1).padStart(2, "0"); // e.g., "01"

  this.offerLetterId = `TV-IN-${yy}${mm}OL${serial}`;
  next();
});

module.exports = mongoose.model("OfferLetter", offerLetterSchema);

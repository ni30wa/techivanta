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

// Auto-generate certificateId in format: TV-IN-YYMMCT01
certificateSchema.pre("validate", async function (next) {
  if (this.certificateId) return next();

  const now = new Date();
  const yy = String(now.getFullYear()).slice(2); // e.g., "25"
  const mm = String(now.getMonth() + 1).padStart(2, "0"); // e.g., "08"
  const ct = "CT"; // Fixed for all types

  // Count all certificates issued this month (regardless of type)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  const count = await mongoose.models.Certificate.countDocuments({
    issuedDate: { $gte: startOfMonth, $lte: endOfMonth },
  });

  const serial = String(count + 1).padStart(4, "0"); // e.g., "0001"

  this.certificateId = `TV-IN-${yy}${mm}${ct}${serial}`;

  next();
});

module.exports = mongoose.model("Certificate", certificateSchema);

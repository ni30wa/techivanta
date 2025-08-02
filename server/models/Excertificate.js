const mongoose = require("mongoose");

const experienceCertificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    mobileNumber: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/,
    },
    position: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    issuedDate: {
      type: Date,
      default: Date.now,
    },
    reasonForLeaving: {
      type: String,
    },
  },
  { timestamps: true }
);

// Auto-generate certificateId: TV-IN-YYMMEX001
experienceCertificateSchema.pre("validate", async function (next) {
  if (this.certificateId) return next();

  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const prefix = `TV-IN-${yy}${mm}EX`;

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const count = await mongoose.models.ExperienceCertificate.countDocuments({
    issuedDate: { $gte: startOfMonth, $lte: endOfMonth },
  });

  const serial = String(count + 1).padStart(3, "0");
  this.certificateId = `${prefix}${serial}`;

  next();
});

module.exports = mongoose.model(
  "ExperienceCertificate",
  experienceCertificateSchema
);

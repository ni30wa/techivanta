const mongoose = require("mongoose");

const certificationPartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["certification", "partner"],
    required: true,
  },
  website: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "CertificationPartner",
  certificationPartnerSchema
);

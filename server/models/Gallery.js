const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["general", "event", "award", "soothing"],
      default: "general",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);

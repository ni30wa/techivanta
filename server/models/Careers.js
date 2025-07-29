const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["Internship", "Full-Time", "Part-Time", "Contract"],
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ["Fresher", "0-1 years", "1-3 years", "3+ years"],
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  resumeRequired: {
    type: Boolean,
    default: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", jobSchema);

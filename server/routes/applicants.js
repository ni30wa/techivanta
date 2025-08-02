const express = require("express");
const router = express.Router();
const multer = require("multer");
const { resumeStorage } = require("../middleware/upload");
const upload = multer({ storage: resumeStorage });

const Applicant = require("../models/Applicant");

// POST /api/applicants - Public route to apply with resume
router.post("/", upload.single("resumeUrl"), async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      github,
      linkedin,
      jobId,
      title,
      location,
      experience,
    } = req.body;

    const applicant = new Applicant({
      name,
      email,
      mobile,
      github,
      linkedin,
      jobId,
      jobTitle: title,
      jobLocation: location,
      jobExperience: experience,
      resumeUrl: req.file.path,
    });

    await applicant.save();
    res.status(201).json(applicant);
  } catch (err) {
    console.error("Failed to save applicant:", err);
    res.status(400).json({ error: err.message });
  }
});

// GET /api/applicants - ✅ Protected (admin)
router.get("/", async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ appliedAt: -1 });
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applicants" });
  }
});

// GET /api/applicants/count - ✅ Protected (admin)
router.get("/count", async (req, res) => {
  try {
    const count = await Applicant.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to get applicant count" });
  }
});

module.exports = router;

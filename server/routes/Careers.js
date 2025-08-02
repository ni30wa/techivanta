const express = require("express");
const router = express.Router();
const Job = require("../models/Careers");
const auth = require("../middleware/auth"); // ✅ import auth middleware

// Create a new job (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all jobs (Public)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a job by ID (Protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a job by ID (Protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get job count (Protected)
router.get("/count", auth, async (req, res) => {
  try {
    const count = await Job.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

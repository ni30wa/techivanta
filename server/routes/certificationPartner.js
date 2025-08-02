const express = require("express");
const router = express.Router();
const CertificationPartner = require("../models/CertificationPartner");
const auth = require("../middleware/auth"); // ✅ Import auth middleware

// Create new certification or partner (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const data = new CertificationPartner(req.body);
    const saved = await data.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to create entry", details: err.message });
  }
});

// Get all certifications and partners (Public)
router.get("/", async (req, res) => {
  try {
    const items = await CertificationPartner.find().sort({ addedAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

// Get one by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const item = await CertificationPartner.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch entry" });
  }
});

// Update by ID (Protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await CertificationPartner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update", details: err.message });
  }
});

// Delete by ID (Protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await CertificationPartner.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

module.exports = router;

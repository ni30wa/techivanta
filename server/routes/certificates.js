const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");
const auth = require("../middleware/auth"); // ✅ Import auth

// Create Certificate (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const certificate = new Certificate(req.body);
    await certificate.save();
    res.status(201).json(certificate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Certificates (Public)
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.status(200).json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Certificate by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ message: "Not found" });
    res.status(200).json(certificate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find by Document ID (Public)
router.get("/verify/:docId", async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      certificateId: req.params.docId,
    });
    if (!certificate)
      return res.status(404).json({ message: "Certificate not found" });
    res.status(200).json(certificate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Certificate (Protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Certificate (Protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Certificate.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Certificate deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

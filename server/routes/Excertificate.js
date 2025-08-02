const express = require("express");
const router = express.Router();
const ExperienceCertificate = require("../models/Excertificate");
const auth = require("../middleware/auth");

// Create Experience Certificate (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const certificate = new ExperienceCertificate(req.body);
    await certificate.save();
    res.status(201).json({ success: true, data: certificate });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get All Experience Certificates (Protected)
router.get("/", auth, async (req, res) => {
  try {
    const certificates = await ExperienceCertificate.find().sort({
      createdAt: -1,
    });
    res.json({ success: true, data: certificates });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get Single Certificate by MongoDB ID (Protected)
router.get("/:id", auth, async (req, res) => {
  try {
    const certificate = await ExperienceCertificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ success: false, error: "Not found" });
    }
    res.json({ success: true, data: certificate });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Public Verify by Certificate ID
router.get("/verify/:docId", async (req, res) => {
  try {
    const cert = await ExperienceCertificate.findOne({
      certificateId: req.params.docId,
    });
    if (!cert) {
      return res
        .status(404)
        .json({ success: false, message: "Certificate not found" });
    }
    res.json({ success: true, data: cert });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update Experience Certificate (Protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await ExperienceCertificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated) {
      return res.status(404).json({ success: false, error: "Not found" });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Delete Experience Certificate (Protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await ExperienceCertificate.findByIdAndDelete(
      req.params.id
    );
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Not found" });
    }
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

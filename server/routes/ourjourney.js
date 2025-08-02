const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const OurJourney = require("../models/OurJourney");
const auth = require("../middleware/auth"); // 🔐 Add auth middleware

// 🔧 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📦 Setup multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "our_journey",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, crop: "scale" }],
  },
});

const upload = multer({ storage });

// 🔐 POST - Create journey (protected)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { year, title, description, icon, highlight } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const newJourney = new OurJourney({
      year,
      title,
      description,
      icon,
      highlight,
      imageUrl,
    });

    const saved = await newJourney.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Unexpected error", message: err.message });
  }
});

// ✅ GET all journeys (public)
router.get("/", async (req, res) => {
  try {
    const journeys = await OurJourney.find().sort({ year: 1 });
    res.status(200).json(journeys);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔐 PUT - Update journey (protected)
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const updated = await OurJourney.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updated) return res.status(404).json({ error: "Journey not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔐 DELETE - Delete journey (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await OurJourney.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Journey not found" });

    res.status(200).json({ message: "Journey deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

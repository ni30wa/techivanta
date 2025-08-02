const express = require("express");
const router = express.Router();
const OfferLetter = require("../models/OfferLater");
const auth = require("../middleware/auth"); // ✅ Import auth

// ✅ Create Offer Letter (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const newOffer = new OfferLetter(req.body);
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get All Offer Letters (Public)
router.get("/", async (req, res) => {
  try {
    const offers = await OfferLetter.find().sort({ createdAt: -1 });
    res.status(200).json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Single Offer Letter by MongoDB _id (Public)
router.get("/:id", async (req, res) => {
  try {
    const offer = await OfferLetter.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Not found" });
    res.status(200).json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Verify by offerLetterId (Public)
router.get("/verify/:docId", async (req, res) => {
  try {
    const offer = await OfferLetter.findOne({
      offerLetterId: req.params.docId,
    });
    if (!offer)
      return res.status(404).json({ message: "Offer Letter not found" });
    res.status(200).json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Offer Letter (Protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await OfferLetter.findByIdAndUpdate(
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

// ✅ Delete Offer Letter (Protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await OfferLetter.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Offer Letter deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

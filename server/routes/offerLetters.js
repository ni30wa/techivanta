const express = require("express");
const router = express.Router();
const OfferLetter = require("../models/OfferLater");

// Create Offer Letter
router.post("/", async (req, res) => {
  try {
    const newOffer = new OfferLetter(req.body);
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Offer Letters
router.get("/", async (req, res) => {
  try {
    const offers = await OfferLetter.find().sort({ createdAt: -1 });
    res.status(200).json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Offer Letter by MongoDB _id
router.get("/:id", async (req, res) => {
  try {
    const offer = await OfferLetter.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Not found" });
    res.status(200).json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Offer Letter by offerLetterId (custom route for verification)
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

// Update Offer Letter
router.put("/:id", async (req, res) => {
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

// Delete Offer Letter
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await OfferLetter.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Offer Letter deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

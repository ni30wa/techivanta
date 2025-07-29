const express = require("express");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");
const router = express.Router();

// Submit contact form (public)
router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Name, email, and message are required." });
  }

  try {
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });

    await contact.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all messages (admin only)
router.get("/", auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Mark message as read (admin only)
router.put("/:id/read", auth, async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: "Message marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Count messages (admin only)
router.get("/count", auth, async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contact count" });
  }
});

module.exports = router;

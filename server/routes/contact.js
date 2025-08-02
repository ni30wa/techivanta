const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");
const auth = require("../middleware/auth");

// CREATE: Add new customer (protected)
router.post("/", async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res
      .status(201)
      .json({ message: "Customer created", customer: newCustomer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ: Get all customers (protected)
router.get("/", auth, async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

// COUNT: Get total customer count (protected)
router.get("/count", auth, async (req, res) => {
  try {
    const count = await Customer.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer count" });
  }
});

// GET monthly user stats (protected)
router.get("/monthly-stats", auth, async (req, res) => {
  try {
    const stats = await Customer.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formatted = stats.map((item) => ({
      month: months[item._id - 1],
      users: item.users,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Monthly stats error:", error);
    res.status(500).json({ error: "Failed to get user stats" });
  }
});

// READ: Get customer by ID (protected)
router.get("/:id", auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer" });
  }
});

// DELETE: Delete customer (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Customer not found" });
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;

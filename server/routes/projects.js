const express = require("express");
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const router = express.Router();

// 🔒 Get all projects (admin only)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔒 Create project (admin only)
router.post("/", auth, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔒 Get project count
router.get("/count", async (req, res) => {
  try {
    const count = await Project.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project count" });
  }
});

// 🔒 Monthly stats
router.get("/monthly-revenue", auth, async (req, res) => {
  try {
    const stats = await Project.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
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
      count: item.count,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Monthly project count error:", error);
    res.status(500).json({ error: "Failed to get project stats" });
  }
});

// 🔒 Get project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🔒 Update project
router.put("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔒 Delete project
router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

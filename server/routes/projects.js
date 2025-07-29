const express = require("express");
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const router = express.Router();

// Get all projects (public)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create project (admin only)
router.post("/", auth, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// add count get all
router.get("/count", async (req, res) => {
  try {
    const count = await Project.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project count" });
  }
});
// GET monthly stats
router.get("/monthly-revenue", async (req, res) => {
  try {
    const stats = await Project.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }, // count projects instead of summing revenue
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
      count: item.count,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Monthly project count error:", error);
    res.status(500).json({ error: "Failed to get project stats" });
  }
});

//Get Project by Id
router.get("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({ error: "Project not found" });
  }
});

// Update project (admin only)
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

// Delete project (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

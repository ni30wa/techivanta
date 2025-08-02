const express = require("express");
const router = express.Router();
const Employee = require("../models/Employees");
const auth = require("../middleware/auth");

// 🔹 Create new employee
router.post("/", auth, async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const saved = await employee.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Get all employees
router.get("/", auth, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Get single employee by ID
router.get("/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });
    res.json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Update employee
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Employee not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Delete employee
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Get total employee count
router.get("/count/total", async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res.json({ total: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Get count of employees who resigned
router.get("/count/resign", auth, async (req, res) => {
  try {
    const count = await Employee.countDocuments({ status: "resigned" });
    res.json({ status: "resigned", count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Get count of employees by status
router.get("/count/status", auth, async (req, res) => {
  try {
    const status = req.query.status || "resigned";
    const count = await Employee.countDocuments({ status });
    res.json({ status, count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

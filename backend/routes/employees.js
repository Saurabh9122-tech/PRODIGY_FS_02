const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const authMiddleware = require("../middleware/auth");

// Create employee
router.post("/", authMiddleware, async (req, res) => {
  const { name, position, salary } = req.body;
  const employee = new Employee({ name, position, salary });
  await employee.save();
  res.status(201).json(employee);
});

// Read all employees
router.get("/", authMiddleware, async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Update employee
router.put("/:id", authMiddleware, async (req, res) => {
  const { name, position, salary } = req.body;
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    { name, position, salary },
    { new: true }
  );
  res.json(updated);
});

// Delete employee
router.delete("/:id", authMiddleware, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
});

module.exports = router;

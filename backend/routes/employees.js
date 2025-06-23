const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const authMiddleware = require('../middleware/auth');

// ✅ CREATE employee
router.post('/', authMiddleware, async (req, res) => {
  try {
    const employee = new Employee({
      ...req.body,
      createdBy: req.user.id
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    console.error('Create Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ READ all employees (for the logged-in user)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find({ createdBy: req.user.id });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ UPDATE employee
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Employee.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// ✅ DELETE employee
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Employee.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;

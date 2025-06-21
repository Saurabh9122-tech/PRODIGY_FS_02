const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true }
});
// GET all employees
router.get("/", authMiddleware, async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// PUT update employee
router.put("/:id", authMiddleware, async (req, res) => {
  const { name, position, salary } = req.body;
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    { name, position, salary },
    { new: true }
  );
  res.json(updated);
});

// DELETE employee
router.delete("/:id", authMiddleware, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
});


module.exports = mongoose.model('Employee', EmployeeSchema);

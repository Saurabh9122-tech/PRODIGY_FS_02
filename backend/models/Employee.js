const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // optional but useful
});
module.exports = mongoose.model('Employee', EmployeeSchema);

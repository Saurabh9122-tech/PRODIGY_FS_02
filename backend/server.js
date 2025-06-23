const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // ✅ route function
const employeeRoutes = require('./routes/employees');
require('dotenv').config(); // ✅ load .env

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// ✅ Use actual routes (must be express.Router())
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

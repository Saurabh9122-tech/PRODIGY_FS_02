const express = require('express');
const cors = require('cors');
const connectDB = require('/config/db');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: 'Invalid credentials (user not found)' });
    }

    // ✅ Debug passwords
    console.log("👉 Input password:", password);
    console.log("🔒 Hashed password from DB:", user.password);

    // ✅ Compare passwords securely
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("✅ Password match result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials (wrong password)' });
    }

    // ✅ Sign JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "default_secret", {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error('❗ Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

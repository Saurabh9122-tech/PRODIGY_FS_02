const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// ✅ Register Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    console.log('✅ User registered:', username);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❗ Registration error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials (user not found)' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials (wrong password)' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '1h'
    });

    res.json({ token });
  } catch (err) {
    console.error('❗ Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

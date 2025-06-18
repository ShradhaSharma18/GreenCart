const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token with user name and email in payload
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Sign Up
router.post('/signup', async (req, res) => {
  const { name, email, password, postalCode } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, postalCode });
    const token = generateToken(user);

    res.status(201).json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
});

module.exports = router;

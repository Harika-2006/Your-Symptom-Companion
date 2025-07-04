const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// @route   POST api/signup
// @desc    Register a user
// @access  Public
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Signup request received");

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    user = new User({
      name,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Create and return a JSON Web Token in a cookie
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "kdl-secure-jwt-secret",
      { expiresIn: 3600 }, // Expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 3600 * 1000, // 1 hour in milliseconds
        }).json({ success: true, message: 'User registered and logged in' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

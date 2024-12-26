const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mentormodel = require('../model/mentor');
const adminmodel = require('../model/User');
const router = express.Router();
router.use(express.json());

router.post('/', async (req, res) => {
  try {
    const { email, password} = req.body;

    let user;
    if (email === 'ictak@example.com') {
      user = await adminmodel.findOne({ email: email });
    } else {
      user = await mentormodel.findOne({ email: email });
    }

    console.log("USER:", user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the stored hash
    const isPasswordValid = (password === user.password); // You can use bcrypt for hashing passwords
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, '111', { expiresIn: '1h' });
    console.log(token);

    // Respond with the token and user data
    res.json({ token, user });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

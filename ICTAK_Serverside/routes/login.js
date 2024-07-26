const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usermodel = require('../model/mentor');
const router = express.Router();
router.use(express.json());
const admin = require('../model/User');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await admin.findOne({ email });
    console.log("USER:", user);
    if (user) {
      // Admin found, compare plain text password
      if (password === user.password) {
        const token = jwt.sign({ userId: user._id, role: 'admin' }, '111', { expiresIn: '1h' });
        return res.json({ token, user });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }
    user = await usermodel.findOne({ email: req.body.email });
    console.log("USER:", user);

    // if (!user || password !== req.body.password) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });    
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, '111', { expiresIn: '1h' });
    console.log(token);

    // Respond with the token and user data
    res.json({ token, user });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

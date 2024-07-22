const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usermodel = require('../model/User');
const router = express.Router();
router.use(express.json());

router.post('/', async (req, res) => {
  try {
    const { email, password,role } = req.body;
    const user = await usermodel.findOne({ email: req.body.email });
    console.log("USER:", user);

    if (!user || password !== req.body.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, '111', { expiresIn: '1h' });
    console.log(token);
    if (user.role === 'admin') {
      navigate('/admindashboard');
    } else if (user.role === 'mentor') {
      navigate('/mentordashboard');
    } else {
      console.error('Unknown user role:', user.role);
    }
    // Respond with the token and user data
    res.json({ token, user });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

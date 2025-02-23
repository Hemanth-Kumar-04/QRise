const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ userCount: count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

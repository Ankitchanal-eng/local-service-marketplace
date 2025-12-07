const express = require('express');
// FIX: Import the correct exported name: 'authenticateJWT'
const { authenticateJWT } = require('../middleware/authMiddleware');
const router = express.Router();

// FIX: Use the correct imported name in the route definition
router.get('/test', authenticateJWT, (req, res) => {
  res.json({ message: 'Protected route OK', user: req.user });
});

module.exports = router;

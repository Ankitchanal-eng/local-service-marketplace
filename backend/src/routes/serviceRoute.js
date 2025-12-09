const express = require('express');
// FIX: Import the correct exported name: 'authenticateJWT' and 'authorizeRoles'
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');
const serviceController = require('../controllers/serviceController');
const router = express.Router();



// FIX: Use the correct imported name in the route definition
router.get('/test', authenticateJWT, (req, res) => {
  res.json({ message: 'Protected route OK', user: req.user });
});

router.post(
  '/',
  authenticateJWT,
  authorizeRoles(['provider']), 
  serviceController.createServiceListing
);

router.get(
  '/my',
  authenticateJWT,
  authorizeRoles(['provider']),
  serviceController.getCurrentProviderListings
);

module.exports = router;

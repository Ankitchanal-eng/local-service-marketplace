const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getProviderBookings } = require('../controllers/bookingController');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');

const protect = authenticateJWT;
const customerOnly = authorizeRoles(['customer']);
const providerOnly = authorizeRoles(['provider']);

router.route('/my').get(protect, customerOnly, getMyBookings);
router.route('/provider').get(protect, providerOnly, getProviderBookings );
router.route('/').post(protect, customerOnly, createBooking);

module.exports = router;    
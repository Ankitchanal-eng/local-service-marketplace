const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getProviderBookings, updateBookingStatus, } = require('../controllers/bookingController');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');

const protect = authenticateJWT;
const customerOnly = authorizeRoles(['customer']);
const providerOnly = authorizeRoles(['provider']);

router.route('/my').get(protect, customerOnly, getMyBookings);
router.route('/').post(protect, customerOnly, createBooking);
router.route('/provider').get(protect, providerOnly, getProviderBookings );
router.patch('/:id/status', protect, providerOnly, updateBookingStatus);

module.exports = router;    
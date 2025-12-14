const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings  } = require('../controllers/bookingController');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');

const protect = authenticateJWT;
const customerOnly = authorizeRoles(['customer']);

router.route('/my').get(protect, customerOnly, createBooking);
router.route('/').post(protect, customerOnly, createBooking);

module.exports = router;    
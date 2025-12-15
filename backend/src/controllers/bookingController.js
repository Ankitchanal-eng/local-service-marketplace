const asyncHandler = require('express-async-handler');
const Booking = require('../models/booking');
const ServiceListing = require('../models/serviceListing');

const createBooking = asyncHandler(async (req, res) => {
    const { serviceId, note } = req.body;
    const customerId = req.user.id;     // Comes from your 'protect' middleware (req.user)
    
    console.log("SERVICE ID:", serviceId);
    console.log("IS VALID ObjectId:", require('mongoose').Types.ObjectId.isValid(serviceId));
    
    if (!serviceId) {
        res.status(400);
        throw new Error('Please include a service ID');
        
    }

    // 1. Find the service to verify it exists and get the providerId
    const service = await ServiceListing.findById(serviceId);

    if(!service) {
        res.status(404);
        throw new Error('Service not found');
    }

    // Prevent a provider from booking their own service 
    if (service.ownerId.toString() === customerId.toString() ) {
        res.status(400);
        throw new Error('You cannot book your own service');
    }

    // 2. Create the booking document
    const booking = await Booking.create({
        serviceId: service._id,
        providerId: service.ownerId, // use the ownerid found from the service
        customerId: customerId,
        note: note || 'No description provided.',
        status: 'pending',
    });

    if (booking) {
        // 3. Return the created booking
        res.status(201).json({
            _id: booking.id,
            serviceId: booking.serviceId,
            status: booking.status,
            message: 'Service request successfully created.',
        });
    } else {
        res.status(400);
        throw new Error('Invalid booking data');
    }
});

const getMyBookings = asyncHandler(async (req, res) => {
    const customerId = req.user.id;     // Get customer ID from protected route middleware

    // Find all bookings where customerId matches the logged-in user
    const bookings = await Booking.find({ customerId: customerId })
    .populate('serviceId', 'title')
    .sort({ createdAt: -1 });

    res.status(200).json(bookings);
});

const getProviderBookings = asyncHandler(async (req, res) => {
    const providerId = req.user.id;
    
    const bookings = await Booking.find({ providerId: providerId })
        .populate('serviceId', 'title')
        .populate('customerId', 'email name')
        .sort({ createdAt: -1 });

        res.status(200).json(bookings);
});

module.exports = {
    createBooking,
    getMyBookings,
    getProviderBookings,
};

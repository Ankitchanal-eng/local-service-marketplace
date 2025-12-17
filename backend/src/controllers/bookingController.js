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

const updateBookingStatus = asyncHandler(async (req, res) => {
    const providerId = req.user.id;
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['accepted', 'rejected'];
    if (!allowedStatuses.includes(status)) {
        res.status(400);
        throw new Error('Invalid status value');
    }

    const booking = await Booking.findById(id);

    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    if (booking.providerId.toString() !== providerId.toString()) {
        res.status(403);
        throw new Error('Not authorized to update this booking');
    }

    if (booking.status !== 'pending') {
        res.status(400);
        throw new Error('Booking status can no longer be changed');
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
        _id: booking._id,
        status: booking.status,
        message: `Booking ${status}`,
    });
});

const completeBooking = asyncHandler(async (req, res) => {
    const providerId = req.user.id;
    const { id } = req.params;

    // find booking
    const booking = await Booking.findById(id);
    
    if(!booking) {
        res.status(400);
        throw new Error('Booking not found');
    }

    // ownership check (provider only)
    if(booking.providerId.toString() !== providerId.toString()) {
        res.status(403);
        throw new Error('Not authorized to complete this booking');
    }

    // state validation
    if(booking.status !== 'accepted') {
        res.status(409);
        throw new Error('Only accepted bookings can be completed');
    }

    // update status
    booking.status = 'complete';
    await booking.save();

    res.status(200).json({
        _id: booking._id,
        status: booking.status,
        message: 'Booking marked as completed',
    });
});


module.exports = {
    createBooking,
    getMyBookings,
    getProviderBookings,
    updateBookingStatus,
    completeBooking,
};

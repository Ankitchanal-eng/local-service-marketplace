const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'serviceListing',  // References your ServiceListing model
        },

        providerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user',     // References your user model
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },

        note: {
            type: String,
            maxlength: 500,
        },

        status: {
            type: String,
            required: true,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
    },
    {
        timestamps: true,   // Automatically adds createdAt and updatedAt
    }
);

module.exports = mongoose.model('Booking', bookingSchema)
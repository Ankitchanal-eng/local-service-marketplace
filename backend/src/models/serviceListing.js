const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'service is require'],
        trim: true,
        minLength: 5,
        maxLength: 100
    },

    description: {
        type: String,
        required: [true, 'description is required'],
        trim: true,
        minLength: 15,
        maxLenght: 50
    },

    category: {
        type: String,
        require: [true, 'category is required'],
        enum: ["plumber", "electrician", "tutor", "cleaner", "gardener", "other"]
    },

    city: {
        type: String,
        required: true
    },

    startingPrice: {
        type: mongoose.Schema.Types.Mixed       // Can be string or number
    },

    ownerId: {
        type: String,
        required: true
    }, 

},  {
    timestamps: true    // mongoose handle createdAt and updatedAt automatically 
});

const service = mongoose.model('Service', serviceSchema)
module.exports = service;
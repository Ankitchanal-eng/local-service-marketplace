const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'], // Data type and built-in validation
        unique: true,
        trim: true,
        minLength: 3
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, `Please enter a valid email`] // Regex vaidation
    },

    password: {
        type: String,
        required: [true, `password is required`],
        minLength: 6
    },

    role: {
        type: String,
        enum: ['customer', 'provider', 'admin'],
        default: 'customer',
        require: true
    },

    city: {
        type: String,
        trim: true,
        required: false
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require('mongoose');
const MongoURL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MongoURL, {
        });
        console.log(`MongoDB connected successfully!`);
    } catch (err) {
        console.log(`MongoDB connected error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
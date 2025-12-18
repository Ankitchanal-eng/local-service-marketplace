require('dotenv').config();
const express = require ('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoute');
const bookingRoutes = require('./routes/bookingRoute');
const connectDB = require('./config/db');
const User = require('./models/user');
const app = express(); 

app.use(cors({
  origin: 'http://localhost:5173' // Whitelist your frontend URL
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/bookings', bookingRoutes);
const { errorHandler } = require('./middleware/errorMiddleware');

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})
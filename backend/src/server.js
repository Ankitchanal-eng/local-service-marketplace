 require('dotenv').config();
const express = require ('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoute');
const bookingRoutes = require('./routes/bookingRoute');


const connectDB = require('./config/db');
const User = require('./models/user');
const { errorHandler } = require('./middleware/errorMiddleware');


const app = express();


app.use(helmet());
app.use(express.json());


const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
];

const filteredOrigins = allowedOrigins.filter(origin => origin);
 
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman / server-to-server requests
      if (!origin) return callback(null, true);


      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      if (origin.endsWith('.vercel.app')) {
        return callback(null, true);  
      }
      else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);


app.options('/*splat', cors());


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  
  max: 100,
  message: 'Too many requests, please try again later',
});


const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many attempts, slow down',
});


app.use('/api/v1', apiLimiter);
app.use('/api/v1/auth', strictLimiter, authRoutes);
app.use('/api/v1/services', strictLimiter, serviceRoutes);
app.use('/api/v1/bookings', strictLimiter, bookingRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;


const startServer = async () => {
  try{
    await connectDB();
    console.log('MongoDB connected successfully');


    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1)
  }
};


startServer();
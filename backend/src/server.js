require('dotenv').config();
const express = require ('express');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoute');
const connectDB = require('./config/db');
const User = require('./models/user');
const app = express(); 

app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/services', serviceRoutes);

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})
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

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

app.get('/api/health', function (req, res) {
    res.json({
        message: "app is working"
    })
})

// app.use('/api/auth', require('./routes/authRoutes'))

// app.post('/api/user', async function(req, res) {
//     try {
//         const newUser = await User.create(req.body);
//         res.status(201).json({
//             success: true,
//             data: newUser
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }
// });

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtSecret = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    const { username, email, password, role, city } = req.body;

    try {
        // 1. check if user already exists
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                message: 'user already exist'
            });
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10); //Generate salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. create a new user instance
        user = new User({
            username,
            email,
            password: hashedPassword,
            role,
            city
        });

        // 4. Save the user to the database
        await user.save();

        // 5. Generate JWT after successful save.
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            jwtSecret,
            {expiresIn: '1h'},
            (err, token) => {
                if (err) throw err;

        // 6. Return success response
            res.status(201).json({
                message: 'User registered successfully',
                token: token,
                user: { id: user.id, email: user.email, username: user.username }
            });
          }
        );
    
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
         // Find the user by email
        // We use .select('+password') in case our User model definition explicitly excludes the password field by default
        const user = await User.findOne({email}).select('+password');
        
        // if user not found
        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        // function to check the password against the stored hash.
        const isMatch = await bcrypt.compare(password, user.password);

        // if password is wrong
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        // if correct, then it generate a JWT 
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            jwtSecret,
            // { expiredIn: '1h' },
            (err, token) => {
                if (err) throw err;

                // Return user info + token
                res.json({
                    message: 'Login successful',
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        role: user.role
                    }
                });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
};
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            message: 'No token, authorization denied'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Token format invalid, authorization denied'
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();

    } catch (err) {
        res.status(401).json({
            message: 'Token is not valid'
        });
    }
};

exports.authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({
                message: 'User role not available after authentication'
            });
        }

        if (allowedRoles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({
                message: 'Forbidden: You do not have permission to access this resource'
            })
        }
    }
}
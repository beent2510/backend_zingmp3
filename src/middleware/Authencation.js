const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Token not provided',
            data: null
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                message: 'Token is invalid or expired',
                data: null
            });
        }

        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };

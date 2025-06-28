const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided');
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'jwtSecret');
        const { id, username } = decoded;
        req.user = { id, username }; // to pass to next middleware
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route');
    }
    // next(decoded);
}

module.exports = authenticationMiddleware
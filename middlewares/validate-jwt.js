// External imports
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

// Internal imports
const User = require('../models/user');

const validateJWT = async (req, res, next) => { 
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            msg: 'Not authorized'
        });
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(payload.uid);

        if (!user || !user.state) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                msg: 'User not active or not found'
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error
        });
    }
};

module.exports = {
    validateJWT
};
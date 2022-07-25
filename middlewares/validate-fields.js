// External imports
const { StatusCodes } = require('http-status-codes');

// Middlewares
const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: errors.array()
        });
    }

    next();
};


module.exports = {
    validateFields
};
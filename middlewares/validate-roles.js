// External imports
const { StatusCodes } = require('http-status-codes');


const validateAdminRole = (req, res, next) => {
    const user = req.user;
    if (user?.role !== 'ADMIN_ROLE') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            msg: 'Not authorized'
        });
    }
    next();
};

const haveAccess = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req?.user?.role)) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                msg: 'Not authorized'
            });
        }
        next();
    };
};


module.exports = { 
    validateAdminRole,
    haveAccess
};
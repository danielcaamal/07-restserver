// Internal imports
const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    // Verify if the role is valid
    const validRole = await Role.findOne({ role: role });
    if (!validRole) {
        throw new Error(`${role} is not a valid role`);
    }
};

const uniqueEmail = async (email = '') => {
    // Verify if the email exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`Email: ${email} already exists`);
    }
};

const validId = async (id = '') => {
    // Verify if the id is valid
    const validId = await User.findOne({ _id: id });
    if (!validId) {
        throw new Error(`${id} is not a valid id`);
    }
};

module.exports = {
    isValidRole,
    uniqueEmail,
    validId
};
// External imports
// const { response } = require('express');
const { StatusCodes } = require('http-status-codes');
const bcryptjs = require('bcryptjs');

// Internal imports
const User = require('../models/user');

const getUsers = async (req, res) => {
    try {
        const { limit, from, to } = req.query;
        
        const query = { state: true };

        const [ total, users ] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(from) || 0)
                .limit(Number(limit) || 5),
        ]);

        res.status(StatusCodes.OK).json({
            total,
            users
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error
        });
    }
};

const getUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        res.status(StatusCodes.OK).json({
            user
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, password, role });
        
        // Encrypt the password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        // Save the user
        await user.save();
    
        res.status(StatusCodes.CREATED).json({
            user
        });
    }
    catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { _id, password, google, email, ...user } = req.body;

        if (password) {
            // Encrypt the password
            const salt = bcryptjs.genSaltSync();
            user.password = bcryptjs.hashSync(password, salt);
        }

        const newUser = await User.findByIdAndUpdate(id, user);

        res.status(StatusCodes.OK).json({
            user: newUser
        });
    }
    catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error
        });
    }
};


const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findByIdAndUpdate(id, { state: false });

        res.status(StatusCodes.ACCEPTED).json({
            user
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error
        });
    }
};

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
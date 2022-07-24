// External imports
// const { response } = require('express');
const { StatusCodes } = require('http-status-codes');

const getUsers = (req, res) => {
    const queryParams = req.query;

    res.status(StatusCodes.OK).json({
        "msg": "get API",
        queryParams
    });
}

const getUser = (req, res) => {
    const queryParams = req.query;

    res.status(StatusCodes.OK).json({
        "msg": "get API",
        queryParams
    });
}

const createUser = (req, res) => {
    const body = req.body;

    res.status(StatusCodes.OK).json({
        "msg": "post API",
        body
    });
}

const updateUser = (req, res) => {
    const id = req.params.id;
    res.status(StatusCodes.OK).json({
        "msg": "post API",
        id
    });
}


const deleteUser = (req, res) => {
    const id = req.params.id;
    res.status(StatusCodes.OK).json({
        "msg": "delete API",
        id
    });
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}
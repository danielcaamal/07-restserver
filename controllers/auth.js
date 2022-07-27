// External imports
const bcryptjs = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

// Internal imports
const User = require('../models/user');


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verify if email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                msg: 'User not found'
            });
        }

        // Verify if user is active
        if (!user.state) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                msg: 'User not active'
            });
        }

        // Verify the password
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                msg: 'User or password incorrect'
            });
        }

        // Create JWT token
        const token = await generateJWT(user.id);

        res.status(StatusCodes.ACCEPTED).json({
            user,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error
        });
    }
};

const googleSignIn = async (req, res) => {
    try {
        const { id_token } = req.body;

        // Google User
        const { name, picture, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            const data = {
                name,
                email,
                password: 'random',
                img: picture,
                google: true
            };

            user = new User(data);
            await user.save();
        } else {
            // TODO: If user exists
        }

        if (!user.state) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                msg: 'User not active'
            });
        }

        // Create JWT token
        const token = await generateJWT(user.id);


        res.status(StatusCodes.OK).json({
            token,
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
    login,
    googleSignIn
};
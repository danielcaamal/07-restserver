// External imports
const { Router } = require('express');

// Middlewares
const { check } = require('express-validator');

// Internal imports
const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is not valid').not().isEmpty(),
    // check('id').custom(validId),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'id_token is necessary').not().isEmpty(),
    // check('id').custom(validId),
    validateFields
], googleSignIn);

module.exports = router;
// External imports
const { Router } = require('express');

// Middlewares
const { check } = require('express-validator');

// Internal imports
const { getUsers, updateUser, createUser, deleteUser, getUser } = require('../controllers/user');
const { isValidRole, uniqueEmail, validId } = require('../helpers/db-validators');
const { validateFields, validateJWT, haveAccess } = require('../middlewares');

const router = Router();

router.get('/', getUsers);

router.get('/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(validId),
    validateFields
], getUser);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(uniqueEmail),
    check('password', 'Password must contain at least 6 characters').isLength({ min: 6 }),
    check('role').custom(isValidRole),
    validateFields
], createUser);

router.patch('/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(validId),
    check('role').custom(isValidRole),
    validateFields
],updateUser);

router.delete('/:id', [
    validateJWT,
    haveAccess('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(validId),
    validateFields
], deleteUser);

module.exports = router;
// External imports
const { Router } = require('express');

// Internal imports
const { getUsers, updateUser, createUser, deleteUser } = require('../controllers/user');

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
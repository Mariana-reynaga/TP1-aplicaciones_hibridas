const express = require('express');
const router = express.Router();
router.use(express.json());

const { bringUsers, getUserXname, getUserXid, createUser, updateUser, deleteUser } = require('../controllers/UserController');

// Rutas
router.get('/', bringUsers);

router.get('/:name', getUserXname);

router.get('/:id', getUserXid);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
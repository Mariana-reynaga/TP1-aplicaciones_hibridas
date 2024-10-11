const express = require('express');
const router = express.Router();
router.use(express.json());

const { bringUsers, getUserXname, getUserXid, createUser, updateUser, deleteUser, login } = require('../controllers/UserController');

// Rutas
router.get('/', bringUsers);

router.get('/name/:name', getUserXname);

router.get('/:id', getUserXid);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser); 

router.post('/login', login); 

module.exports = router;
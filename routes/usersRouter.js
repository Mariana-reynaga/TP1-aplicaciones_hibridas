const express = require('express');
const router = express.Router();
router.use(express.json());

// Rutas
router.get('/', (req, res)=>{
    res.status(200).send('Ruta GET / de users');
});

router.get('/:id', (req, res)=>{
    const id = req.params.id;
    res.status(200).send(`Ruta GET /${id} de users`);
});

router.post('/', (req, res)=>{
    const id = req.params.id;
    res.status(200).send(`Ruta POST / de users`);
});

router.put('/:id', (req, res)=>{
    const id = req.params.id;
    res.status(200).send(`Ruta PUT /${id} de users`);
});

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    res.status(200).send(`Ruta DELETE /${id} de user`);
});

module.exports = router;
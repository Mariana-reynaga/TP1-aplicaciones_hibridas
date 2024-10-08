const express = require('express');
const router = express.Router();
router.use(express.json());

// Rutas
router.get('/', (req, res)=>{
    res.status(200).send('Ruta GET / de recognized breed');
});

router.get('/:id', (req, res)=>{
    const id = req.params.id;
    res.status(200).send(`Ruta GET /${id} de recognized breed`);
});

router.post('/', (req, res)=>{
    const id = req.params.id;
    res.status(200).send(`Ruta POST / de recognized breed`);
});

router.put('/:id', (req, res)=>{
    const id = req.params.id;
    res.status(200).send(`Ruta PUT /${id} de recognized breed`);
});

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    res.status(200).send(`Ruta DELETE /${id} de recognized breed`);
});

module.exports = router;
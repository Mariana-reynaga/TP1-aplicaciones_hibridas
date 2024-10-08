const express = require('express');
const router = express.Router();
router.use(express.json());

// Rutas
router.get('/', (req, res)=>{
    res.status(200).send('Ruta GET / de experimental breed');
});

router.get('/:id', (req, res)=>{
    const id = req.params.id;
    res.status(200).send(`Ruta GET /${id} de experimental breed`);
});

router.post('/', (req, res)=>{
    const id = req.params.id;
    res.status(200).send(`Ruta POST / de experimental breed`);
});

router.put('/:id', (req, res)=>{
    const id = req.params.id;
    res.status(200).send(`Ruta PUT /${id} de experimental breed`);
});

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    res.status(200).send(`Ruta DELETE /${id} de experimental breed`);
});

module.exports = router;
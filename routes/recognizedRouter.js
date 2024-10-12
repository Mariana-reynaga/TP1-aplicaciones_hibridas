const express = require('express');
const router = express.Router();
router.use(express.json());

const { getRecognizedBreeds, getBreedXid, getBreedXlength, getBreedXcolor, getBreedXname, createRecognized, updateRecognizedBreed, deleteRecognizedBreed } = require('../controllers/RecognizedController');

// Rutas
router.get('/', getRecognizedBreeds);

router.get('/name/:name', getBreedXname);

router.get('/length/:length', getBreedXlength);

router.get('/color/:color', getBreedXcolor);

router.get('/:id', getBreedXid);

router.post('/', createRecognized);

router.put('/:id', updateRecognizedBreed);

router.delete('/:id', deleteRecognizedBreed);

module.exports = router;
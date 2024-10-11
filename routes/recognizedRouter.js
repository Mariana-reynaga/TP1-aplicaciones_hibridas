const express = require('express');
const router = express.Router();
router.use(express.json());

const { getRecognizedBreeds, getBreedXid, createRecognized, updateRecognizedBreed, deleteRecognizedBreed } = require('../controllers/RecognizedController');

// Rutas
router.get('/', getRecognizedBreeds);

router.get('/:id', getBreedXid);

router.post('/', createRecognized);

router.put('/:id', updateRecognizedBreed);

router.delete('/:id', deleteRecognizedBreed);

module.exports = router;
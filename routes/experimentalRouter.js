const express = require('express');
const router = express.Router();
router.use(express.json());

const { getExperimentalBreeds, getBreedXname, getBreedXid, createExperimental, updateExperimentalBreed, deleteExperimentalBreed } = require('../controllers/ExperimentalController');

// Rutas
router.get('/', getExperimentalBreeds);

router.get('/:name', getBreedXname);

router.get('/:id', getBreedXid);

router.post('/', createExperimental);

router.put('/:id', updateExperimentalBreed);

router.delete('/:id', deleteExperimentalBreed);

module.exports = router;
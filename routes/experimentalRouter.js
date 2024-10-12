const express = require('express');
const router = express.Router();
router.use(express.json());

const { getExperimentalBreeds, getBreedXname, getBreedXlength,  getBreedXcolor, getBreedXid, createExperimental, updateExperimentalBreed, deleteExperimentalBreed } = require('../controllers/ExperimentalController');

// Rutas
router.get('/', getExperimentalBreeds);

router.get('/name/:name', getBreedXname);

router.get('/length/:length', getBreedXlength);

router.get('/color/:color', getBreedXcolor);

router.get('/:id', getBreedXid);

router.post('/', createExperimental);

router.put('/:id', updateExperimentalBreed);

router.delete('/:id', deleteExperimentalBreed);

module.exports = router;
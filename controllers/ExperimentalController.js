// Chalk
const chalk = require('chalk');
const log = console.log;

const Experimental = require('../Models/ExperimentalModel');
const Recognized = require('../Models/RecognizedModel');

// Traer todas las razas experimentales
const getExperimentalBreeds = async ( req, res ) => {
    const breeds = await Experimental.find();

    try {
        if (breeds.length == 0) {
            res.status(404).json( { msg: "No existen razas experimentales."} );
    
        }else {
            res.status(200).json( { msg: "Razas experimentales: ", data: breeds } );
        }

    } catch (error) {
        log(chalk.bgRed('[ExperimentalController.js]: getExperimentalBreeds: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

// Traer una raza experimental por nombre
const getBreedXname = async ( req, res ) => {
    const {name} = req.params;

    try{
        const query = Experimental.where({name: name});

        const breedName = await query.findOne();

        if (breedName) {
            res.status(200).json({msg: "¡Raza encontrada!", data: breedName});

        } else {
            res.status(404).json({msg: "No se encontro la raza.", data: {}});
        }

    }catch(error){
        log(chalk.bgRed('[ExperimentalController.js]: getBreedXname: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Traer una raza por ID
const getBreedXid = async ( req, res ) => {
    const {id} = req.params; 

    try {
        const breed = await Experimental.findById(id);

        if (breed) {
            res.status(200).json({msg: "¡Raza encontrada!", data: breed});

        }else{
            res.status(404).json({msg: "No se encontro la raza.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[ExperimentalController.js]: getBreedXid: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Añadir una nueva raza experimental
const createExperimental = async ( req, res ) =>{
    const { name, origin, coat_length, possible_colors } = req.body;
    
    if ( !name || !origin || !coat_length || !possible_colors ) {
        res.status(400).json({msg: 'Faltan datos obligatorios.', data: { name, origin, coat_length, possible_colors }});
    };

    try {
        const recognizedCheck = await Recognized.exists( { name } );

        if (recognizedCheck) {
            return res.status(400).send({ msg: "La raza ya existe y es reconocida." });
        }

        if ( name.length >= 4 && possible_colors.length > 0 ) {

            const breedExist = await Experimental.exists({ name });

            if (breedExist){
                return res.status(400).send({ msg: "La raza ya existe." });
            }

            const newBreed = new Experimental( { name, origin, coat_length, possible_colors } );
            
            await newBreed.save();

            res.status(200).json( { msg: "Raza Creada.", data: newBreed } );


        } else {
            res.status(400).json({msg: 'Datos incorrectos. El nombre debe ser al menos 4 caracteres y debe tener al menos 1 color posible.', data: { name, origin, coat_length, possible_colors } });
        }
        
    } catch (error) {
        log(chalk.bgRed('[ExperimentalController.js]: createExperimental: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Actualizar una raza
const updateExperimentalBreed = async ( req, res ) =>{
    const { id } = req.params;
    const { name, origin, coat_length, possible_colors } = req.body;

    const newData = { name, origin, coat_length, possible_colors };
    
    try {
        const breed = await Experimental.findById(id);

        if(!name || !origin || !coat_length || !possible_colors){
            res.status(400).json({msg: 'Faltan datos obligatorios.', data:{newData}});
        }else

        if (breed) {
            if (name.length >= 4 && possible_colors.length > 0) {
                const newBreed = await Experimental.findByIdAndUpdate(id, newData, {new: true});
    
                res.status(200).json({msg: "La raza fue actualizada exitosamente.", data: newBreed});

            }else {
                res.status(400).json({msg: 'Datos incorrectos. El nombre debe ser al menos 4 caracteres y debe tener al menos 1 color posible.', data: { name, origin, coat_length, possible_colors }});
            }

        }else{
            res.status(404).json({msg: "No se encontro la raza", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[ExperimentalController.js]: updateExperimentalBreed: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Eliminar una raza
const deleteExperimentalBreed = async ( req, res ) =>{
    const { id } = req.params;

    try {
        const breed = await Experimental.findByIdAndDelete(id);

        if (breed) {
            res.status(200).json({msg: "La raza fue eliminada exitosamente.", data: breed});

        }else{
            res.status(404).json({msg: "No se encontro la raza.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[ExperimentalController.js]: deleteExperimentalBreed: ' , error));
        res.status(500).json({msg: 'OOPS, tenemos un error.', data: {}});
    }
};

module.exports = { getExperimentalBreeds, getBreedXname, getBreedXid, createExperimental, updateExperimentalBreed, deleteExperimentalBreed };
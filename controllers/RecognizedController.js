// Chalk
const chalk = require('chalk');
const log = console.log;

const Recognized = require('../Models/RecognizedModel');

// Traer todas las razas reconocidas
const getRecognizedBreeds = async ( req, res ) => {
    const breeds = await Recognized.find();

    try {
        if (breeds.length == 0) {
            res.status(404).json( { msg: "No existen razas reconocidas."} );
    
        }else {
            res.status(200).json( { msg: "Razas reconocidas: ", data: breeds } );
        }

    } catch (error) {
        log(chalk.bgRed('[RecognizedController.js]: getRecognizedBreeds: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

// Traer una raza por ID
const getBreedXid = async ( req, res ) => {
    const {id} = req.params; 

    try {
        const breed = await Recognized.findById(id);

        if (breed) {
            res.status(200).json({msg: "¡Raza encontrada!", data: breed});

        }else{
            res.status(404).json({msg: "No se encontro la raza.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[RecognizedController.js]: getBreedXid: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Añadir una nueva raza reconocida
const createRecognized = async ( req, res ) =>{
    const { name, origin, coat_length, possible_colors } = req.body;
    
    if ( !name || !origin || !coat_length || !possible_colors ) {
        res.status(400).json({msg: 'Faltan datos obligatorios.', data: { name, origin, coat_length, possible_colors }});
    };

    try {
        
        if ( name.length >= 4 && possible_colors.length > 0 ) {

            const breedExist = await Recognized.exists({ name });

            if (breedExist){
                return res.status(400).send({ msg: "La raza ya existe." });
            }

            const newBreed = new Recognized( { name, origin, coat_length, possible_colors } );
            
            await newBreed.save();

            res.status(200).json( { msg: "Raza Creada.", data: newBreed } );


        } else {
            res.status(400).json({msg: 'Datos incorrectos. El nombre debe ser al menos 4 caracteres y debe tener al menos 1 color posible.', data: { name, origin, coat_length, possible_colors } });
        }
        
    } catch (error) {
        log(chalk.bgRed('[RecognizedController.js]: createRecognized: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Actualizar una raza
const updateRecognizedBreed = async ( req, res ) =>{
    const { id } = req.params;
    const { name, origin, coat_length, possible_colors } = req.body;

    const newData = { name, origin, coat_length, possible_colors };
    
    try {
        const breed = await Recognized.findById(id);

        if(!name || !origin || !coat_length || !possible_colors){
            res.status(400).json({msg: 'Faltan datos obligatorios.', data:{newData}});
        }else

        if (breed) {
            if (name.length >= 4 && possible_colors.length > 0) {
                const newBreed = await Recognized.findByIdAndUpdate(id, newData, {new: true});
    
                res.status(200).json({msg: "La raza fue actualizada exitosamente.", data: newBreed});

            }else {
                res.status(400).json({msg: 'Datos incorrectos. El nombre debe ser al menos 4 caracteres y debe tener al menos 1 color posible.', data: { name, origin, coat_length, possible_colors }});
            }

        }else{
            res.status(404).json({msg: "No se encontro la raza", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[RecognizedController.js]: updateRecognizedBreed: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Eliminar un Usuario
const deleteRecognizedBreed = async ( req, res ) =>{
    const { id } = req.params;

    try {
        const breed = await Recognized.findByIdAndDelete(id);

        if (breed) {
            res.status(200).json({msg: "La raza fue eliminada exitosamente.", data: breed});

        }else{
            res.status(404).json({msg: "No se encontro la raza.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[RecognizedController.js]: deleteRecognizedBreed: ' , error));
        res.status(500).json({msg: 'OOPS, tenemos un error.', data: {}});
    }
};

module.exports = { getRecognizedBreeds, getBreedXid, createRecognized, updateRecognizedBreed, deleteRecognizedBreed };
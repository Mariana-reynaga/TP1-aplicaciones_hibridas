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

// Traer una raza por largo de pelo
const getBreedXlength = async ( req, res )=>{
    const { length } = req.params;

    const possible_lengths = Experimental.schema.path('coat_length').enumValues;

    try {
        if ( !possible_lengths.includes(length) ) {
            res.status(400).json({msg: "Largo de pelo no valido.", data: {}});

        }else{
            const query = Experimental.where({coat_length: length});
    
            const allLengths = await query.find();
    
            if (allLengths.length !== 0) {
                res.status(200).json({msg: "¡Raza encontradas!", data: allLengths});
    
            } else {
                res.status(404).json({msg: "No se encontron razas con ese largo de pelo.", data: {}});
            }
        }

    } catch (error) {
        log(chalk.bgRed('[ExperimentalController.js]: getBreedXlength: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Traer razas por color de pelo
const getBreedXcolor = async ( req, res ) => {
    const { color } = req.params;

    const valid_colors = Experimental.schema.path('possible_color').enumValues;

    try {
        if ( !valid_colors.includes(color) ) {
            res.status(400).json({msg: "Color de pelo no valido.", data: {}});

        }else{

            const query = Experimental.where({possible_color: color});
    
            const allColor = await query.find();
    
            if (allColor.length !== 0) {
                res.status(200).json({msg: "¡Raza encontradas!", data: allColor});
    
            } else {
                res.status(404).json({msg: "No se encontron razas con ese color de pelo.", data: {}});
            }
        }

    } catch (error) {
        log(chalk.bgRed('[RecognizedController.js]: getBreedXcolor: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
}

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
    const { name, origin, coat_length, possible_color } = req.body;
    
    if ( !name || !origin || !coat_length || !possible_color ) {
        res.status(400).json({msg: 'Faltan datos obligatorios.', data: { name, origin, coat_length, possible_color }});
    };

    const possible_lengths = Experimental.schema.path('coat_length').enumValues;

    const valid_colors = Experimental.schema.path('possible_color').enumValues;

    try {   
        const recognizedCheck = await Recognized.exists( { name } );

        if (recognizedCheck) {
            return res.status(400).send({ msg: "La raza ya existe y es reconocida." });
        }

        if ( name.length >= 4 && valid_colors.includes(possible_color) && possible_lengths.includes(coat_length) ) {

            const breedExist = await Experimental.exists({ name });

            if (breedExist){
                return res.status(400).send({ msg: "La raza ya existe." });
            }

            const newBreed = new Experimental( { name, origin, coat_length, possible_color } );
            
            await newBreed.save();

            res.status(200).json( { msg: "Raza Creada.", data: newBreed } );


        } else {
            res.status(400).json({
                msg: 'Datos incorrectos.', 
                correctData:{
                    nombre: "El nombre debe ser al menos 4 caracteres.",
                    color: "Los colores validos son: 'white', 'black', 'ginger', 'tabby', 'blue', 'brown', 'calico' y 'rosette'.",
                    largo: "Los largos validos son: 'short', 'long', 'bald'."
                }, 
                data: { 
                    name, 
                    origin, 
                    coat_length, 
                    possible_color 
                } 
            });
        }
        
    } catch (error) {
        log(chalk.bgRed('[ExperimentalController.js]: createExperimental: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Actualizar una raza
const updateExperimentalBreed = async ( req, res ) =>{
    const { id } = req.params;
    const { name, origin, coat_length, possible_color } = req.body;

    const newData = { name, origin, coat_length, possible_color };
    
    const possible_lengths = Experimental.schema.path('coat_length').enumValues;

    const valid_colors = Recognized.schema.path('possible_color').enumValues;

    try {
        const breed = await Experimental.findById(id);

        if(!name || !origin || !coat_length || !possible_color ){
            res.status(400).json({msg: 'Faltan datos obligatorios.', data:{newData}});
        }else

        if (breed) {
            if ( name.length >= 4 && valid_colors.includes(possible_color) && possible_lengths.includes(coat_length) ) {
                const newBreed = await Experimental.findByIdAndUpdate(id, newData, {new: true});
    
                res.status(200).json({msg: "La raza fue actualizada exitosamente.", data: newBreed});

            }else {
                res.status(400).json({
                    msg: 'Datos incorrectos.', 
                    correctData:{
                        nombre: "El nombre debe ser al menos 4 caracteres.",
                        color: "Los colores validos son: 'white', 'black', 'ginger', 'tabby', 'blue', 'brown', 'calico' y 'rosette'.",
                        largo: "Los largos validos son: 'short', 'long', 'bald'."
                    }, 
                    data: 
                    { 
                        name, 
                        origin, 
                        coat_length, 
                        possible_color 
                    }
                });
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

module.exports = { getExperimentalBreeds, getBreedXname, getBreedXlength, getBreedXcolor, getBreedXid, createExperimental, updateExperimentalBreed, deleteExperimentalBreed };
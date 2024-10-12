// Chalk
const chalk = require('chalk');
const log = console.log;

const Recognized = require('../Models/RecognizedModel');
const Experimental = require('../Models/ExperimentalModel');

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
};

// Traer una raza reconocida por nombre
const getBreedXname = async ( req, res ) => {
    const {name} = req.params;

    try{
        const query = Recognized.where({name: name});

        const breedName = await query.findOne();

        if (breedName) {
            res.status(200).json({msg: "¡Raza encontrada!", data: breedName});

        } else {
            res.status(404).json({msg: "No se encontro la raza.", data: {}});
        }

    }catch(error){
        log(chalk.bgRed('[RecognizedController.js]: getBreedXname: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Traer razas por largo de pelo
const getBreedXlength = async ( req, res )=>{
    const { length } = req.params;

    const possible_lengths = Recognized.schema.path('coat_length').enumValues;

    try {
        if ( !possible_lengths.includes(length) ) {
            res.status(400).json({msg: "Largo de pelo no valido.", data: {}});

        }else{
            const query = Recognized.where({coat_length: length});
    
            const allLengths = await query.find();
    
            if (allLengths.length !== 0) {
                res.status(200).json({msg: "¡Raza encontradas!", data: allLengths});
    
            } else {
                res.status(404).json({msg: "No se encontron razas con ese largo de pelo.", data: {}});
            }
        }

    } catch (error) {
        log(chalk.bgRed('[RecognizedController.js]: getBreedXlength: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Traer razas por color de pelo
const getBreedXcolor = async ( req, res ) => {
    const { color } = req.params;

    const valid_colors = Recognized.schema.path('possible_color').enumValues;

    try {
        if ( !valid_colors.includes(color) ) {
            res.status(400).json({msg: "Color de pelo no valido.", data: {}});

        }else{

            const query = Recognized.where({possible_color: color});
    
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
    const { name, origin, coat_length, possible_color } = req.body;
    
    if ( !name || !origin || !coat_length || !possible_color ) {
        res.status(400).json({msg: 'Faltan datos obligatorios.', data: { name, origin, coat_length, possible_color }});
    };

    const possible_lengths = Recognized.schema.path('coat_length').enumValues;

    const valid_colors = Recognized.schema.path('possible_color').enumValues;

    try {
        const experimentalCheck = await Experimental.exists( { name } );

        if (experimentalCheck) {
            return res.status(400).send({ msg: "La raza ya existe y es experimental." });
        }

        if ( name.length >= 4 && possible_lengths.includes(coat_length) && valid_colors.includes(possible_color) ) {

            const breedExist = await Recognized.exists({ name });

            if (breedExist){
                return res.status(400).send({ msg: "La raza ya existe." });
            }

            const newBreed = new Recognized( { name, origin, coat_length, possible_color } );
            
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
                    name, origin, 
                    coat_length, 
                    possible_color 
                }
            });
        }
        
    } catch (error) {
        log(chalk.bgRed('[RecognizedController.js]: createRecognized: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Actualizar una raza
const updateRecognizedBreed = async ( req, res ) =>{
    const { id } = req.params;
    const { name, origin, coat_length, possible_color } = req.body;

    const newData = { name, origin, coat_length, possible_color };
    
    const possible_lengths = Recognized.schema.path('coat_length').enumValues;

    const valid_colors = Recognized.schema.path('possible_color').enumValues;

    try {
        const breed = await Recognized.findById(id);

        if(!name || !origin || !coat_length || !possible_color){
            res.status(400).json({msg: 'Faltan datos obligatorios.', data:{newData}});
        }else

        if (breed) {
            if ( name.length >= 4 && valid_colors.includes(possible_color) && possible_lengths.includes(coat_length) ) {
                const newBreed = await Recognized.findByIdAndUpdate(id, newData, {new: true});
    
                res.status(200).json({msg: "La raza fue actualizada exitosamente.", data: newBreed});

            }else {
                res.status(400).json({msg: 'Datos incorrectos. El nombre debe ser al menos 4 caracteres, debe tener al menos 1 color posible y el largo del pelo debe ser "short", "long" o "bald".', data: { name, origin, coat_length, possible_color }});
            }

        }else{
            res.status(404).json({msg: "No se encontro la raza", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[RecognizedController.js]: updateRecognizedBreed: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Eliminar una raza
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

module.exports = { getRecognizedBreeds, getBreedXid, getBreedXname, getBreedXlength, getBreedXcolor, createRecognized, updateRecognizedBreed, deleteRecognizedBreed };
// Chalk
const chalk = require('chalk');
const log = console.log;

const User = require('../Models/UsersModel');

// Traer Todos Los Usuarios
const bringUsers = async ( req, res ) => {
    const users = await User.find();

    try {
        if (users.length == 0) {
            log(chalk.blue("No hay usuarios"))
            res.status(404).json( { msg: "No existen Usuarios"} );
    
        }else {
            res.status(200).json( { msg: "Usuarios: ", data: users } );
        }

    } catch (error) {
        log(chalk.bgRed('[UserController.js]: bringUsers: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }

};

// Traer un Usuario por ID
const getUserXid = async ( req, res ) => {
    const {id} = req.params; 

    try {
        const user = await User.findById(id);

        if (user) {
            res.status(200).json({msg: "¡Usuario encontrado!", data: user});

        }else{
            res.status(404).json({msg: "No se encontro el usuario.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[UserController.js]: getUserXid: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Falta poner el hash
// Crear un usuario
const createUser = async ( req, res ) =>{
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        res.status(400).json({msg: 'Faltan datos obligatorios', data: { name , email , password }});
    };

    // const passwordHash = await bcrypt.hash(password, salt);
    
    try {
        
        if (password.length >= 8 && email.indexOf('@') > -1 ) {

            const userExist = await User.exists({ email });

            if (userExist){
                return res.status(400).send({ msg: "El usuario ya existe." });
            }
          
            const newUser = new User( { name, email, password } );
            
            await newUser.save();

            res.status(200).json( { msg: "Usuario Creado", data: newUser } );


        } else {
            res.status(400).json({msg: 'Datos incorrectos. La contraseña debe ser al menos 8 caracteres y el email debe contener un @.', data: { email, password }});
        }
        
    } catch (error) {
        log(chalk.bgRed('[UserController.js]: createUser: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Actualizar un Usuario
const updateUser = async ( req, res ) =>{
    const { id } = req.params;
    const { name, password, email } = req.body;

    const newData = {name, password, email};
    
    try {
        const user = await User.findById(id);

        if(!newData.name || !newData.email || !newData.password){
            res.status(400).json({msg: 'Datos incorrectos. El nombre, email y password son requeridos', data:{newData}});
        }else

        if (user) {
            if (password.length >= 8 && email.indexOf('@') > -1 ) {
                const newUser = await User.findByIdAndUpdate(id, newData, {new: true});
    
                res.status(200).json({msg: "El usuario fue actualizado exitosamente.", data: newUser});

            }else {
                res.status(400).json({msg: 'Datos incorrectos. La contraseña debe ser al menos 8 caracteres y el email debe contener un @.', data: { email, password }});
            }

        }else{
            res.status(404).json({msg: "No se encontro el usuario", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[UserController.js]: updateUser: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

// Eliminar un Usuario
const deleteUser = async ( req, res ) =>{
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (user) {
            res.status(200).json({msg: "El usuario fue eliminado exitosamente.", data: user});

        }else{
            res.status(404).json({msg: "No se encontro el usuario.", data: {}});
        }
    } catch (error) {
        log(chalk.bgRed('[UserController.js]: deleteUser: ' , error));
        res.status(500).json({msg: 'OOPS, tenemos un error.', data: {}});
    }
};

module.exports = { bringUsers, getUserXid, createUser, updateUser, deleteUser };
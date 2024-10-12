// Chalk
const chalk = require('chalk');
const log = console.log;

// FileSystem
const fs = require('fs');

// Importar DB inicial
const Experimental = require('./Models/ExperimentalModel');
const Recognized = require('./Models/RecognizedModel');
const User = require('./Models/UsersModel');

const importarDB = async () => {
    try {
        const experimentalData = JSON.parse(fs.readFileSync('./data/experimental_breeds.json', 'utf-8'));

        const recognizedData = JSON.parse(fs.readFileSync('./data/recognized_breeds.json', 'utf-8'));

        const userData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

        await Experimental.deleteMany();
        await Experimental.create(experimentalData);

        await Recognized.deleteMany();
        await Recognized.create(recognizedData);

        await User.deleteMany();
        await User.create(userData);

    } catch (error) {
        log(chalk.bgRed('[main.js]: importarDB: ' ,error));
        res.status(500).json({msg: 'OOPS, tenemos un error', data: {}});
    }
};

importarDB();

// Express
const express = require('express');
const app = express();
app.use(express.json());

// Dotenv
require('dotenv').config();
const port = process.env.PORT;

// Router
const routerAPI = require('./routes');

// Connexión a database
const db = require('./config/database');

app.use( (req, res, next)=>{
    log(chalk.bgBlackBright('Middleware funciona correctamente.'));
    next();
});

app.use(  express.static('public') );

// Ruta raiz
app.get('/api', (req, res)=>{ 
    res.status(200).send("<h1>API REST michis</h1>");
});

routerAPI(app);

app.listen(port, ()=>{
    log(chalk.white.bgBlue("Conexión establecida, el puerto es: ", port));
});
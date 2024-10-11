// Chalk
const chalk = require('chalk');
const log = console.log;

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
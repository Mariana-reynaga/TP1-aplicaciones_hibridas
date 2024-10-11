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

// Mongoose / MongoDB
const mongoose = require('mongoose');
const { User } = require('./Models/UsersModel');
mongoose.connect(process.env.CONNECTION);
const db = mongoose.connection;

db.on('error', ()=> log(chalk.white.bgRed('Error')));

db.once('open', ()=>{
    log(chalk.cyan.bgWhite('Conexión correcta'));
});

app.use( (req, res, next)=>{
    log(chalk.black.bgBlue('Hola desde el middleware'));
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
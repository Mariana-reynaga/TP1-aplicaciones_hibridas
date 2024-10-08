const chalk = require('chalk');
const log = console.log;

const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const port = process.env.PORT;

const routerAPI = require('./routes');

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
'use strict'

// Requires
const express = require('express');
const bodyParser = require('body-parser');

// Ejecutar express
const app = express();

// Cargar archivos de rutas
const user_routes = require('./routes/user');
const topic_routes = require('./routes/topic');


// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS

// Reescribir rutas
app.use('/api', user_routes);
app.use('/api', topic_routes);

// Exportar modulo
module.exports = app;


'use strict'

// Requires
const express = require('express');
const bodyParser = require('body-parser');

// Ejecutar express
const app = express();

// Cargar archivos de rutas

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS

// Reescribir rutas

// Ruta para metodo de prueba
app.get('/prueba', (request, response) => {
    // return response.status(200).send("<h1>Hola mundo</h1>")
    return response.status(200).send({
        message: 'Hola mundo desde el backend con nodejs'
    });
});

// Exportar modulo
module.exports = app;


'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3999;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_node', { useNewUrlParser: true })
        .then(() => {
            console.log('La conexion a la DB se ha efectuado correctamente!!');

            // Crear el servidor
            app.listen(port, () => {
                console.log('El servidor esta corriendo correctamente!');
                console.log('http://localhost:3999');
            })
        })
        .catch(error => console.log(error));
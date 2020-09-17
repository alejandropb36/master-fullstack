'use strict'

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_node', { useNewUrlParser: true })
        .then(() => {
            console.log('La conexion a la DB se ha efectuado correctamente!!');
        })
        .catch(error => console.log(error));
'use strict'

const validator = require('validator');

const controller = {
    probando: function (request, response) {
        return response.status(200).send({
            message: "Soy el metodo probando",
            request: ''
        });
    },

    testeando: function (request, response) {
        return response.status(200).send({
            message: "Soy el metodo testeando"
        });
    },

    save: function (req, res) {
        // recooger los parametros de la peticion
        const params = req.body;

        // Validar los datos
        var validate_name = !validator.isEmpty(params.name);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_passwrod = !validator.isEmpty(params.password);

        if (validate_name && validate_surname && validate_email && validate_passwrod) {
            // Crear el objeto del usuario

            // Asignar valores al usuario

            // Comprobar si el usuario existe

            // Si no existe,

            // cifrar la contrasena

            // guardar usuario

            // Devolver una respuesta
            return res.status(200).send({
                message: 'Registro de usuarios',
                params
            });
        } else {
            return res.status(400).send({
                message: 'Datos no validos',
            });
        }

    }
};

module.exports = controller;
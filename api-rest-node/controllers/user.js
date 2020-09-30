'use strict'

const validator = require('validator');
const User = require('../models/user');

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
            const user = new User();

            // Asignar valores al usuario
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email.toLowerCase();
            user.role = 'ROLE_USER';
            user.image = null;

            // Comprobar si el usuario existe
            User.findOne({ email: user.email }, (err, isserUser) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Error al comprobar duplicidad de usuario',
                    });
                }

                if (!isserUser) {
                    // Si no existe,

                    // cifrar la contrasena

                    // guardar usuario

                    // Devolver una respuesta
                    return res.status(200).send({
                        message: 'El usuario no esta registrado',
                        params
                    });
                } else {
                    return res.status(400).send({
                        message: 'El usuario ya esta registrado',
                    });
                }
            });
            
        } else {
            return res.status(400).send({
                message: 'Datos no validos',
            });
        }

    }
};

module.exports = controller;
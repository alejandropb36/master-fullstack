'use strict'

const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jswt = require('../services/jwt');

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
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_passwrod = !validator.isEmpty(params.password);
        }
        catch (error) {
            return res.status(400).send({
                message: 'Error al validar los datos'
            });
        }

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

                // Si no existe,
                if (!isserUser) {

                    // cifrar la contrasena
                    bcrypt.hash(params.password, null, null, (error, hash) => {
                        user.password = hash
                        // guardar usuario
                        user.save((error, userStored) => {
                            if (error) {
                                return res.status(500).send({
                                    message: 'Error al guardar el usuario',
                                });
                            }
                            if (!userStored) {
                                return res.status(400).send({
                                    message: 'El usuario no se ha guardado',
                                });
                            }
                            // Devolver una respuesta
                            return res.status(201).send({
                                status: 'success',
                                user: userStored
                            });

                        });
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

    },

    login: function (req, res) {
        // Recoger los parametros de la peticion
        const params = req.body;

        // Validar los datos que llegan 
        const validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        const validate_password = !validator.isEmpty(params.password);
        try {
        }
        catch (error) {
            return res.status(400).send({
                message: 'Error al validar los datos'
            });
        }

        if (!validate_password || !validate_email) {
            return res.status(400).send({
                message: 'Los datos son incorrectos, envialos bien!!'
            });
        }

        // Buscar usuarios que coincidan
        User.findOne({ email: params.email.toLowerCase() }, (err, user) => {

            if (err) {
                return res.status(500).send({
                    message: 'Error al intentar identificarse'
                });
            }

            if (!user) {
                return res.status(404).send({
                    message: 'El usuario no existe'
                });
            }
            // Si lo encuentra

            // Comprobar contrasena (coincidencia email y password)
            bcrypt.compare(params.password, user.password, (err, check) => {
                if (err) {
                }

                // Si es correcto, 
                if (check) {
                    // Generar un token jwt y devolver
                    if (params.getToken) {
                        return res.status(200).send({
                            token: jswt.createToken(user)
                        });
                    }

                    // Limpiar el objeto
                    user.password = undefined;

                    // Devolver los datos
                    return res.status(200).send({
                        user: user
                    });
                } else {
                    return res.status(400).send({
                        message: 'El usuario no ha podido identificarse'
                    });
                }
            });


        });

    },

    update: function (req, res) {
        // Recoger el body
        const params = req.body;

        // Validar los datos
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        }
        catch (error) {
            return res.status(400).send({
                message: 'Error al validar los datos'
            });
        }

        // Eliminar propiedades innecesarias
        delete params.password;

        const userId = req.user.sub;

        // Comprobar si el email es unico
        if (req.user.email != params.email) {
            User.findOne({ email: params.email.toLowerCase() }, (err, user) => {

                if (err) {
                    return res.status(500).send({
                        message: 'Error al intentar identificarse'
                    });
                }
    
                if (user) {
                    return res.status(400).send({
                        message: 'El email no puede ser modoficado'
                    });
                }
            });
        } else {
            // Busacr y actualizar
            User.findOneAndUpdate({ _id: userId }, params, {new: true}, (err, userUpdated) => {
    
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar el usuario',
                        err
                    }); 
                }
    
                if (!userUpdated) {
                    return res.status(400).send({
                        status: 'error',
                        message: 'No se ha actualizado el usuario'
                    });
                }
    
                return res.status(200).send({
                    status: 'success',
                    user: userUpdated
                });
            });
        }



        
    }
};

module.exports = controller;
'use strict'

const controller = {
    probando: function(request, response) {
        return response.status(200).send({
            message: "Soy el metodo probando",
            request: ''
        });
    }, 

    testeando: function(request, response) {
        return response.status(200).send({
            message: "Soy el metodo testeando"
        });
    },
     
    save : function(req, res) {
        // recooger los parametros de la peticion

        // Validar los datos

        // Crear el objeto del usuario

        // Asignar valores al usuario

        // Comprobar si el usuario existe

        // Si no existe,

        // cifrar la contrasena

        // guardar usuario

        // Devolver una respuesta

        return res.status(200).send({
            message: 'Registro de usuarios'
        });

    }
};

module.exports = controller;
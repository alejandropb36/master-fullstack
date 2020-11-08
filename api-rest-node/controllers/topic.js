'use strict'

const controller = {
    test: function(req, res) {
        return res.status(200).send({
            message: "metodo test de topic"
        });
    },

    save: function(req, res) {

        // Recoger los datos

        // Validar los datos

        // Crear el objeto a guardar

        // Asignar valores
        
        // Guardar el topic

        // Devolver una respuesta

        return res.status(200).send({
            message: "Soy el metodo para guardar el topic"
        });
    }
};

module.exports = controller;
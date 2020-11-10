'use strict'

const validator = require('validator');
const topic = require('../models/topic');
const Topic = require('../models/topic');

const controller = {
    test: function(req, res) {
        return res.status(200).send({
            message: "metodo test de topic"
        });
    },

    save: function(req, res) {

        // Recoger los datos
        var params = req.body;

        // Validar los datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
            var validate_lang = !validator.isEmpty(params.lang);

        } catch (error) {
            return res.status(400).send({
                message: "Error al validar los datos"
            });
        }

        if(validate_title && validate_lang && validate_content) {
            // Crear el objeto a guardar
            var topic = new Topic(); 
    
            // Asignar valores
            topic.title = params.title;
            topic.content = params.content;
            topic.lang = params.lang;
            topic.code = params.code;

            // Guardar el topic
            topic.save((error, topicStore) => {
                if(error || !topicStore) {
                    return res.status(500).send({
                        message: "Error al guardar el topic"
                    });
                }
                // Devolver una respuesta
                return res.status(200).send({
                    status: "success",
                    topic: topicStore
                });
            });
    
        } else {
            return res.status(400).send({
                message: "datos no validos"
            });
        }

    },

    getTopics: function(req, res) {
        // Cargar la libreria de paginacion

        // Recoger la pagina actual

        // Indicar las opciones de paginacion

        // Find paginado

        // Devolver topic(topics, total del topics, total de paginas)


        return res.status(200).send({
            status: "success",
            topics: []
        });
    }
};

module.exports = controller;
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
            topic.user = req.user.sub;

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
        // Cargar la libreria de paginacion (En el modelo)

        // Recoger la pagina actual
        var page = req.params.page;
        if (!page) {
            page = 1;
        } else {
            page = parseInt(page);
        }

        // Indicar las opciones de paginacion
        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 5,
            page: page
        };

        // Find paginado
        Topic.paginate({}, options, (err, topics) => {

            if (err) {
                return res.status(500),send({
                    status: "error",
                    message: "Error al buscar los topics"
                });
            }

            if (!topics) {
                return res.status(404).send({
                    status: "error",
                    message: "No hay topics"
                });
            }

            // Devolver topic(topics, total del topics, total de paginas)
    
            return res.status(200).send({
                status: "success",
                topics: topics
            });
        });
    }
};

module.exports = controller;
'use strict'

const validator = require('validator');
const topic = require('../models/topic');
const Topic = require('../models/topic');

const controller = {
    test: function (req, res) {
        return res.status(200).send({
            message: "metodo test de topic"
        });
    },

    save: function (req, res) {

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

        if (validate_title && validate_lang && validate_content) {
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
                if (error || !topicStore) {
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

    getTopics: function (req, res) {
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
                return res.status(500), send({
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
    },

    getTopicsByUser: function (req, res) {
        // Conseguir el id del usuario
        const userId = req.params.user;

        // Buscar con la condicion de usuario
        Topic.find({
            user: userId
        })
            .sort([['date', 'descending']])
            .exec((err, topics) => {
                if (err) {
                    return res.status(500).send({
                        status: "error",
                        message: "Error al buscar topics"
                    });
                }

                if (!topics) {
                    return res.status(404).send({
                        status: "error",
                        message: "No existen topics de ese usuario"
                    });
                }

                // Devolver el resultado

                return res.status(200).send({
                    status: "success",
                    topics: topics
                });
            });

    },

    getTopic: function (req, res) {
        const topicId = req.params.topic;

        Topic.findById(topicId)
            .populate('user')
            .exec((err, topic) => {
                if (err) {
                    return res.status(500).send({
                        status: "error",
                        message: "Error al buscar el topic"
                    });
                }

                if (!topic) {
                    return res.status(404).send({
                        status: "error",
                        message: "No se encontro el topic que esta buscando"
                    });
                }

                return res.status(200).send({
                    status: "success",
                    topic: topic
                });
            });
    },

    update: function (req, res) {
        // Recoger el id del topic de la url
        var topicId = req.params.id;

        // Recoger los datos
        var params = req.body;

        // Validar la informacion
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
            var validate_lang = !validator.isEmpty(params.lang);

        } catch (error) {
            return res.status(400).send({
                message: "Error al validar los datos"
            });
        }

        if (validate_title && validate_lang && validate_content) {
            // Montar un json con los datos modificados
            var update = {
                title: params.title,
                content: params.content,
                code: params.code,
                lang: params.lang
            };

            // Find and update por id y por dueño
            Topic.findOneAndUpdate({_id: topicId, user: req.user.sub}, update, {new: true}, (err, topicUpdate) => {
                if (err) {
                    return res.status(500).send({
                        status: "error",
                        message: "Error al actualizar los datos"
                    });
                }

                if (!topicUpdate) {
                    return res.status(404).send({
                        status: "error",
                        message: "El topic que trata de actualizar no fue encontrado"
                    });
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: "success",
                    topic: topicUpdate
                });

            });

        } else {
            return res.status(400).send({
                message: "Error al validar los datos"
            });
        }
    }
};

module.exports = controller;
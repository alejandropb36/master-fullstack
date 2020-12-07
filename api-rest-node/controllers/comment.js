'use strict'

const validator = require('validator');
const Topic = require('../models/topic');

const controller = {
    add: function(req, res) {
        // Recoger el Id del topic de la url
        var topicId = req.params.topicId;

        // Buscar por id del topic
        Topic.findById(topicId, (err, topic) => {
            if(err) {
                return res.status(500).send({
                    status: "error",
                    message: "Ha ocurrido un error al agregar el comentario"
                });
            }

            if(!topic) {
                return res.status(404).send({
                    status: "error",
                    message: "No se ha encontrado el topic"
                });
            }

            // Comprobar si el usuario esta idfentificado y validar datos
            if (req.body.content) {
                try {
                    var validate_content = !validator.isEmpty(req.body.content);
        
                } catch (error) {
                    return res.status(400).send({
                        message: "Error al validar los datos"
                    });
                }

                if (validate_content) {
                    // En la propiedad comments del objeto resultante hacer un push
                    var comment = {
                        user: req.user.sub,
                        content: req.body.content
                    }
                    
                    topic.comments.push(comment);
                    // Guardar el topic completo
                    topic.save((err) => {
                        if(err) {
                            return res.status(500).send({
                                status: "error",
                                message: "Ha ocurrido un error al guardar el comentario"
                            });
                        }
                        // Devolver respuesta
                        return res.status(200).send({
                            status: "success",
                            topic: topic
                        });
                    });
            
                } else {
                    return res.status(400).send({
                        status: "error",
                        message: "Error al validar el content"
                    });
                }
            }
        });

    },

    update: function(req, res) {
        // Conseguir el id del comentario
        var commentId = req.params.commentId;

        // Recoger datos y validar
        var body = req.body;

        try {
            var validate_content = !validator.isEmpty(body.content);

        } catch (error) {
            return res.status(400).send({
                message: "Error al validar los datos"
            });
        }

        if (validate_content) {
            // Find an update de un sub documento
            Topic.findOneAndUpdate(
                {"comments._id": commentId},
                {
                    "$set": {
                        "comments.$.content": body.content
                    }
                },
                {new: true},
                (err, topicUpdated) => {
                    if(err) {
                        return res.status(500).send({
                            status: "error",
                            message: "Ha ocurrido un error al actualizar el comentario"
                        });
                    }

                    if(!topicUpdated) {
                        return res.status(404).send({
                            status: "error",
                            message: "No se ha encontrado el topic"
                        });
                    }
                    // Devolver los datos
                    return res.status(200).send({
                        status: "success",
                        topic: topicUpdated
                    });
                }
            );
        } else {
            return res.status(400).send({
                message: "Error al validar los datos"
            });
        }
    },

    delete: function(req, res) {
        // Sacar el id del topic y del comentario a borrar
        const topicId = req.params.topicId;
        const commentId = req.params.commentId;
        // Buscar el topic

        Topic.findById(topicId, (err, topic) => {
            
            if(err) {
                return res.status(500).send({
                    status: "error",
                    message: "Ha ocurrido un error al buscar el topic"
                });
            }

            if(!topic) {
                return res.status(404).send({
                    status: "error",
                    message: "No se ha encontrado el topic"
                });
            }
            
            // Seleccionar el subdocumento
            var comment = topic.comments.id(commentId);
    
            // Borrar el comentario
            if(comment) {
                comment.remove();
                // Guardar el topic
                topic.save((err) => {
                    if(err) {
                        return res.status(500).send({
                            status: "error",
                            message: "Ha ocurrido un error al guardar el topic"
                        });
                    }

                    // Devolver un resultado
                    return res.status(200).send({
                        status: "success",
                        message: "Metodo de borrar comentarios",
                        topic: topic
                    });
                });
    
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No se ha encontrado el comentario"
                });
            }
        });

    },

};

module.exports = controller;
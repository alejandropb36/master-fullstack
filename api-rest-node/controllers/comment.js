'use strict'

const controller = {
    add: function(req, res) {
        return res.status(200).send({
            message: "Metodo de agregar comentarios"
        });
    },

    update: function(req, res) {
        return res.status(200).send({
            message: "Metodo de edicion comentarios"
        });
    },

    delete: function(req, res) {
        return res.status(200).send({
            message: "Metodo de borrar comentarios"
        });
    },

};

module.exports = controller;
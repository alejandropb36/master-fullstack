'use strict'

const controller = {
    test: function(req, res) {
        return res.status(200).send({
            message: "metodo test de topic"
        });
    }
};

module.exports = controller;
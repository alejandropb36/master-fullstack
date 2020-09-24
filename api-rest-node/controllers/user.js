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
    }
};

module.exports = controller;
'use strict'

exports.authenticated = function(req, res, next) {
    console.log("Estas pasando por el middleware de auth");

    next();
};

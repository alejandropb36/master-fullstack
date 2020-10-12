'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = "clave-secreta-para-generar-el-token554789666545";



exports.authenticated = function(req, res, next) {
    // Comprobar si llega la autorizacion
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'No se cuenta con la cabecera de authorization'
        });
    }

    // Limpiar token y quitar comillas
    const token = req.headers.authorization.replace(/["']/g, '');
    let payload = {};

    try {
        // Decodificar el token
        payload = jwt.decode(token, secret);

        // Comprobar expiracion del token
        if(payload.exp <= moment().unix()) {
            return res.status(401).send({
                message: 'El token ha expirado'
            });
        }
        
    } catch (error) {
        return res.status(401).send({
            message: 'El token no es valido'
        });
    }

    // Adjuntar usuario identificado a la request
    req.user = payload;

    // Pasar a la accion
    next();
};

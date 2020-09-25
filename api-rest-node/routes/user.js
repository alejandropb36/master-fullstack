'user stric'

const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();

// Rutas de prueba
router.get('/probando', UserController.probando);
router.post('/testeando', UserController.testeando);

// Rutas de usuarios
router.post('/register', UserController.save)

module.exports = router;
'user stric'

const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();

router.get('/probando', UserController.probando);
router.post('/testeando', UserController.testeando);

module.exports = router;
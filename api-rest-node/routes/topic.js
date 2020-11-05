'use strict'

const express = require('express');
const TopicController = require('../controllers/topic');

const router = express.Router();
const md_auth = require('../middlewares/authenticated');

router.get('/test', TopicController.test);

module.exports = router;
'use strict'

const express = require('express');
const TopicController = require('../controllers/topic');

const router = express.Router();
const md_auth = require('../middlewares/authenticated');

router.get('/test', TopicController.test);
router.post('/topic', md_auth.authenticated, TopicController.save);
router.get('/topics/:page?', TopicController.getTopics);
router.get('/user-topics/:user', TopicController.getTopicsByUser);
router.get('/topic/:topic', TopicController.getTopic);
router.put('/topic/:id',md_auth.authenticated, TopicController.update);
router.delete('/topic/:id', md_auth.authenticated, TopicController.delete);

module.exports = router;
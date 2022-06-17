const express = require('express');
const router = express.Router();
const controller = require('./controller');

// pages

router.get('/createGame', controller.CreateGet);
router.get('/startGame', controller.StartGet);

// services
router.get('/games', controller.games);
router.get('/game/:id', controller.showDetailsGame);
router.get('/game/:id/winner', controller.winnerPlayerGet);

router.post('/startGame', controller.StartPost);
router.post('/createGame', controller.CreatePost);

module.exports = router;
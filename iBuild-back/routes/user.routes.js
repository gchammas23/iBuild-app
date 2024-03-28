var express = require('express');
var router = express.Router();

const user = require('../services/user.services');

router.post('/register', user.createUser);
router.post('/authenticateUser', user.authenticateUser);
router.post('/authenticate', user.authenticate);

module.exports = router
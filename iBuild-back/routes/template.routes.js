var express = require('express');
var router = express.Router();

const template = require('../services/template.services');

router.post("/saveTemplate/:user", template.saveTemplate);
router.get("/getTemplate/:user", template.getTemplate);

module.exports = router
var express = require('express');
var router = express.Router();
var controllerMatricula = require('../controller/controllerMatricula.js');

router.get('/', controllerMatricula.get);

router.post('/', controllerMatricula.post);

router.put('/', controllerMatricula.put);

router.delete('/', controllerMatricula.delete);

module.exports = router;
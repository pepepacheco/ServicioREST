var express = require('express');
var router = express.Router();
var controllerMatricula = require('../controller/controllerMatricula.js');

router.get('/matricula', controllerMatricula.get);

router.post('/matricula', controllerMatricula.post);

router.put('/matricula', controllerMatricula.put);

router.delete('/matricula', controllerMatricula.delete);

module.exports = router;
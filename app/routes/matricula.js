var express = require('express');
var router = express.Router();
var controllerMatricula = require('../controller/controllerMatricula.js');

router.get('/', controllerMatricula.get);

router.get('/alumno/:dni', controllerMatricula.getForStudent);

router.get('/asignatura/:nombre', controllerMatricula.getForSubject);

router.post('/', controllerMatricula.post);

router.put('/', controllerMatricula.put);

router.delete('/delete', controllerMatricula.delete);

module.exports = router;
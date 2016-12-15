var express = require('express');
var router = express.Router();
var controllerAlumno = require('../controller/controllerAlumno.js');

router.get('/', controllerAlumno.get);

router.get('/:id', controllerAlumno.getId);

router.get('/dni/:dni', controllerAlumno.getDni);

router.get('/nombre/:nombre', controllerAlumno.getName);

router.post('/', controllerAlumno.post);

router.put('/', controllerAlumno.put);

router.delete('/:id', controllerAlumno.delete);

module.exports = router;
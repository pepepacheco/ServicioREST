var express = require('express');
var router = express.Router();
var controllerAlumno = require('../controller/controllerAlumno.js');

router.get('/', controllerAlumno.get);

router.get('/:nombre', controllerAlumno.getNombre);

router.post('/', controllerAlumno.post);

router.put('/', controllerAlumno.put);

router.delete('/', controllerAlumno.delete);

module.exports = router;
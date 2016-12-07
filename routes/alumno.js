var express = require('express');
var router = express.Router();
var controllerAlumno = require('../controller/controllerAlumno.js');

router.get('/alumno', controllerAlumno.get);

router.post('/alumno', controllerAlumno.post);

router.put('/alumno', controllerAlumno.put);

router.delete('/alumno', controllerAlumno.delete);

module.exports = router;
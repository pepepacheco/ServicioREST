var express = require('express');
var router = express.Router();
var controllerAsignatura = require('../controller/controllerAsignatura.js');

router.get('/asignatura', fcontrollerAsignatura.get);

router.post('/asignatura', controllerAsignatura.post);

router.put('/asignatura', controllerAsignatura.put);

router.delete('/asignatura', controllerAsignatura.delete);

module.exports = router;
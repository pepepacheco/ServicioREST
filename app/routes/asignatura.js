var express = require('express');
var router = express.Router();
var controllerAsignatura = require('../controller/controllerAsignatura.js');

router.get('/', controllerAsignatura.get);

router.get('/:id', controllerAsignatura.getId);

router.get('/nombre/:nombre', controllerAsignatura.getName);

router.get('/ciclo/:ciclo', controllerAsignatura.getCycle);

router.post('/', controllerAsignatura.post);

router.put('/', controllerAsignatura.put);

router.delete('/:id', controllerAsignatura.delete);

module.exports = router;
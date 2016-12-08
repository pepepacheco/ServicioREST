var express = require('express');
var router = express.Router();
var controllerAsignatura = require('../controller/controllerAsignatura.js');

router.get('/', controllerAsignatura.get);

router.get('/:id', controllerAsignatura.getId);

router.post('/', controllerAsignatura.post);

router.put('/', controllerAsignatura.put);

router.delete('/', controllerAsignatura.delete);

module.exports = router;
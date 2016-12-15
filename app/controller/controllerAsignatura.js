var asignatura = require('../model/asignatura.js');

module.exports.get = function (req, res, next) {
    asignatura.loadAll(function (err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({ 'msg': 'No hay datos' });
    });
}

module.exports.getId = function (req, res, next) {
    var id = req.body.id;
    asignatura.loadId(id, function (err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({ 'msg': 'No hay datos' });
    });
}

module.exports.getName = function (req, res, next) {
    var name = req.params.nombre;
    asignatura.loadName(name, function (err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({ "msg": "No hay datos" });
    });
}

module.exports.getCycle = function (req, res, next) {
    var cycle = req.params.ciclo;
    asignatura.loadCycle(cycle, function (err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({ "msg": "No hay datos" });
    });
}

module.exports.post = function (req, res, next) {
    var insertSubject = {
        "nombre": req.body.nombre,
        "ciclo": req.body.ciclo,
        "curso": req.body.curso,
        "horas": req.body.horas
    }

    if (insertSubject.nombre.match(/^[a-zA-Z_áéíóúñ\s]{3,60}$/)) {
        if (insertSubject.ciclo.match(/^[a-zA-Z_áéíóúñ\s]{3,60}$/)) {
            if (insertSubject.curso.match(/^[a-zA-Z_áéíóúñ\s]{1,10}$/)) {
                if (typeof insertSubject.horas === "number" && (!isNaN(insertSubject.horas))
                    && insertSubject.horas > 0 && insertSubject.horas < 20) {

                    asignatura.createSubject(insertSubject, function (err, data) {
                        if (data && data.length !== 0)
                            res.json(data);
                        else
                            res.status(400).json({ "msg": "La Asignatura ya existe" });
                    });
                }
                else
                    res.status(400).json({ "msg": "Horas Incorrectas" });
            }
            else
                res.status(400).json({ "msg": "Curso Incorrecto" });
        }
        else
            res.status(400).json({ "msg": "Ciclo Incorrecto" });
    }
    else
        res.status(400).json({ "msg": "Nombre Incorrecto" });
}

module.exports.put = function (req, res, next) {
    var UpdateOrInsertSubject = {
        "nombre": req.body.nombre,
        "ciclo": req.body.ciclo,
        "curso": req.body.curso,
        "horas": req.body.horas
    }

    if (UpdateOrInsertSubject.nombre.match(/^[a-zA-Z_áéíóúñ\s]{3,60}$/)) {
        if (UpdateOrInsertSubject.ciclo.match(/^[a-zA-Z_áéíóúñ\s]{3,60}$/)) {
            if (UpdateOrInsertSubject.curso.match(/^[a-zA-Z_áéíóúñ\s]{1,10}$/)) {
                if (typeof UpdateOrInsertSubject.horas === "number" && (!isNaN(UpdateOrInsertSubject.horas))
                    && UpdateOrInsertSubject.horas > 0 && UpdateOrInsertSubject.horas < 20) {

                    asignatura.addOrInsertSubject(UpdateOrInsertSubject, function (err, result) {
                        if (result && result.length !== 0)
                            res.json(result);
                        else
                            res.status(500).json({ "msg": "Error Interno del servidor" });
                    });
                }
                else
                    res.status(400).json({ "msg": "Horas Incorrectas" });
            }
            else
                res.status(400).json({ "msg": "Curso Incorrecto" });
        }
        else
            res.status(400).json({ "msg": "Ciclo Incorrecto" });
    }
    else
        res.status(400).json({ "msg": "Nombre Incorrecto" });
}

module.exports.delete = function (req, res, next) {
    var id = req.params.id;

    asignatura.loadId(id, function (err, data) {
        if (data && data.length !== 0) {
            asignatura.deleteSubject(id, function (err, result) {
                if (result && result !== 0)
                    res.json(result);
                else
                    res.status(500).json({ "msg": "Error Interno del servidor" });
            });
        }
        else
            res.status(400).json({ "msg": "ID no corresponde a ninguna asignatura" });
    });

}
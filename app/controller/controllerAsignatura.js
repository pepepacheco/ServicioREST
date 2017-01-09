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
    var id = req.params.id;
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
        "Nombre": req.body.Nombre,
        "Ciclo": req.body.Ciclo,
        "Curso": req.body.Curso,
        "Horas": req.body.Horas
    }

    if (insertSubject.Nombre.match(/^[a-zA-Z_áéíóúñ\s]{3,60}$/)) {
        if (insertSubject.Ciclo.match(/^[a-zA-Z_áéíóúñ\s]{3,60}$/)) {
            if (insertSubject.Curso.match(/^[a-zA-Z_áéíóúñ\s]{1,10}$/)) {
                if (typeof insertSubject.Horas === "number" && (!isNaN(insertSubject.Horas))
                    && insertSubject.Horas > 0 && insertSubject.Horas < 20) {

                    asignatura.createSubject(insertSubject, function (err, data) {
                        if (data && data.length !== 0)
                            res.status(201).json(insertSubject);
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

module.exports.put = function (req, res, next) {
    var updateOrInsertSubject = {
        "Nombre": req.body.Nombre,
        "Ciclo": req.body.Ciclo,
        "Curso": req.body.Curso,
        "Horas": req.body.Horas
    }

    if (updateOrInsertSubject.Nombre.match(/^[a-zA-Z_áéíóúñ\s]{3,60}$/)) {
        if (updateOrInsertSubject.Ciclo.match(/^[a-zA-Z_áéíóúñ\s]{3,60}$/)) {
            if (updateOrInsertSubject.Curso.match(/^[a-zA-Z_áéíóúñ\s]{1,10}$/)) {
                if (typeof updateOrInsertSubject.Horas === "number" && (!isNaN(updateOrInsertSubject.Horas))
                    && updateOrInsertSubject.Horas > 0 && updateOrInsertSubject.Horas < 20) {

                    asignatura.addOrInsertSubject(updateOrInsertSubject, function (err, result) {
                        if (result && result.length !== 0) {
                            if (result[0][0].code === "200")
                                res.status(200).json(updateOrInsertSubject);
                            else if (result[0][0].code === "201")
                                res.status(201).json(updateOrInsertSubject);
                        }
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

    asignatura.loadId(id, function (err, resAsignatura) {
        if (resAsignatura && resAsignatura.length !== 0) {
            asignatura.deleteSubject(id, function (err, result) {
                if (result && result !== 0)
                    res.json(resAsignatura);
                else
                    res.status(500).json({ "msg": "Error interno del servidor" });
            });
        }
        else
            res.status(400).json({ "msg": "ID no corresponde a ninguna asignatura" });
    });

}

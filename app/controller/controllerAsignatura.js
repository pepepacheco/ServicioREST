var asignatura = require('../model/asignatura.js');
var subject = {
    "Nombre": undefined,
    "Ciclo": undefined,
    "Curso": undefined,
    "Horas": undefined
}

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
    subject.Nombre = req.body.Nombre;
    subject.Ciclo = req.body.Ciclo;
    subject.Curso = req.body.Curso;
    subject.Horas = req.body.Horas;


    if (subject.Nombre.match(/^[a-zA-Z_áéíóúñ\s]{3,60}$/)) {
        if (subject.Ciclo.match(/^[a-zA-Z_áéíóúñ\s]{3,60}$/)) {
            if (subject.Curso.match(/^[a-zA-Z_áéíóúñ\s]{1,10}$/)) {
                if (typeof subject.Horas === "number" && (!isNaN(subject.Horas))
                    && subject.Horas > 0 && subject.Horas < 20) {

                    asignatura.createSubject(subject, function (err, data) {
                        if (data && data.length !== 0)
                            res.status(201).json(subject);
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
    subject.Nombre = req.body.Nombre;
    subject.Ciclo = req.body.Ciclo;
    subject.Curso = req.body.Curso;
    subject.Horas = req.body.Horas;

    if (subject.Nombre.match(/^[a-zA-Z_áéíóúñ\s]{3,60}$/)) {
        if (subject.Ciclo.match(/^[a-zA-Z_áéíóúñ\s]{3,60}$/)) {
            if (subject.Curso.match(/^[a-zA-Z_áéíóúñ\s]{1,10}$/)) {
                if (typeof subject.Horas === "number" && (!isNaN(subject.Horas))
                    && subject.Horas > 0 && subject.Horas < 20) {

                    asignatura.addOrsubject(subject, function (err, result) {
                        if (result && result.length !== 0) {
                            if (result[0][0].code === "200")
                                res.status(200).json(subject);
                            else if (result[0][0].code === "201")
                                res.status(201).json(subject);
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

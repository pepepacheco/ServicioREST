var matricula = require('../model/matricula.js');
var enrollment = {};
var regexDate = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

module.exports.get = function (req, res, next) {
    matricula.loadAll(function (err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({ "msg": "No hay datos" });
    });
}

module.exports.getForStudent = function (req, res, next) {
    var dniAlumno = req.params.dni;
    matricula.loadForStudent(dniAlumno, function (err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({ "msg": "No hay datos" });
    });
}

module.exports.getForSubject = function (req, res, next) {
    var nombreAsignatura = req.params.nombre;
    matricula.loadForSubject(nombreAsignatura, function (err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({ "msg": "No hay datos" });
    });
}

module.exports.post = function (req, res, next) {
    enrollment.ID_alumno = req.body.ID_alumno;
    enrollment.ID_asignatura = req.body.ID_asignatura;
    enrollment.fecha_inicio = req.body.fecha_inicio;
    enrollment.fecha_fin = req.body.fecha_fin;


    if (typeof enrollment.ID_alumno === "number" && (!isNaN(enrollment.ID_alumno))) {
        if (typeof enrollment.ID_asignatura === "number" && (!isNaN(enrollment.ID_alumno))) {
            if (enrollment.fecha_inicio.match(regexDate)) {
                if (enrollment.fecha_fin.match(regexDate)) {

                    matricula.addEnrollment(enrollment, function (err, result) {
                        if (result && result.length !== 0) {
                            matricula.loadIds(enrollment.ID_alumno, enrollment.ID_asignatura, function (err, data) {
                                res.status(201).json(data);
                            })
                        }
                        else
                            res.status(500).json({ "msg": "Error Interno del servidor" });
                    });

                }
                else
                    res.status(400).json({ "msg": "Fecha de finalización incorrecta" });
            }
            else
                res.status(400).json({ "msg": "Fecha de inicio incorrecta" });
        }
        else
            res.status(400).json({ "msg": "ID asignatura incorrecto" });
    }
    else
        res.status(400).json({ "msg": "ID alumno incorrecto" });
}

module.exports.put = function (req, res, next) {
    enrollment.ID_alumno = req.body.ID_alumno;
    enrollment.ID_asignatura = req.body.ID_asignatura;
    enrollment.fecha_inicio = req.body.fecha_inicio;
    enrollment.fecha_fin = req.body.fecha_fin;

    if (typeof enrollment.ID_alumno === "number" && (!isNaN(enrollment.ID_alumno))) {
        if (typeof enrollment.ID_asignatura === "number" && (!isNaN(enrollment.ID_alumno))) {
            if (enrollment.fecha_inicio.match(regexDate)) {
                if (enrollment.fecha_fin.match(regexDate)) {

                    matricula.addOrInsertEnrollment(enrollment, function (err, result) {
                        if (result && result.length !== 0) {
                            matricula.loadIds(enrollment.ID_alumno, enrollment.ID_asignatura, function (err, data) {
                                if (result[0][0].code === "200")
                                    res.status(200).json(data);
                                else if (result[0][0].code === "201")
                                    res.status(201).json(data);
                            });
                        }
                        else
                            res.status(500).json({ "msg": "Error Interno del servidor" });
                    });

                }
                else
                    res.status(400).json({ "msg": "Fecha de finalización incorrecta" });
            }
            else
                res.status(400).json({ "msg": "Fecha de inicio incorrecta" });
        }
        else
            res.status(400).json({ "msg": "ID asignatura incorrecto" });
    }
    else
        res.status(400).json({ "msg": "ID alumno incorrecto" });
}

module.exports.delete = function (req, res, next) {
    var idAlumno = req.query.idAlumno;
    var idAsignatura = req.query.idAsignatura;

    matricula.loadIds(idAlumno, idAsignatura, function (err, data) {
        if (data && data.length !== 0) {
            matricula.deleteEnrollment(idAlumno, idAsignatura, function (err, result) {
                if (result && result !== 0) {
                    res.json(data);

                }
                else
                    res.status(500).json({ "msg": "Error Interno del servidor" });
            });
        }
        else
            res.status(400).json({ "msg": "La matrícula no existe" });
    });
}

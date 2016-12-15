var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'ServicioREST'
});

var matricula = require('../model/matricula.js');

module.exports.get = function (req, res, next) {
    matricula.loadAll(function (err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({ "msg": "No hay datos" });
    });
}

module.exports.getForStudent= function (req, res, next) {
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
    var enrollmentInsert = {
        "ID_alumno": req.body.ID_alumno,
        "ID_asignatura": req.body.ID_asignatura,
        "fecha_inicio": req.body.fecha_inicio,
        "fecha_fin": req.body.fecha_fin
    }

    if (typeof enrollmentInsert.ID_alumno === "number" && (!isNaN(enrollmentInsert.ID_alumno))) {
        if (typeof enrollmentInsert.ID_asignatura === "number" && (!isNaN(enrollmentInsert.ID_alumno))) {
            if (enrollmentInsert.fecha_inicio.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)) {
                if (enrollmentInsert.fecha_fin.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)) {

                    matricula.addEnrollment(enrollmentInsert, function (err, result) {
                        if (result && result.length !== 0)
                            res.status(201).json(result);
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
    var enrollmentUpdateOrInsert = {
        "ID_alumno": req.body.ID_alumno,
        "ID_asignatura": req.body.ID_asignatura,
        "fecha_inicio": req.body.fecha_inicio,
        "fecha_fin": req.body.fecha_fin
    }

    if (typeof enrollmentUpdateOrInsert.ID_alumno === "number" && (!isNaN(enrollmentUpdateOrInsert.ID_alumno))) {
        if (typeof enrollmentUpdateOrInsert.ID_asignatura === "number" && (!isNaN(enrollmentUpdateOrInsert.ID_alumno))) {
            if (enrollmentUpdateOrInsert.fecha_inicio.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)) {
                if (enrollmentUpdateOrInsert.fecha_fin.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)) {

                    matricula.addOrInsertEnrollment(enrollmentUpdateOrInsert, function (err, result) {
                        if (result && result.length !== 0)
                            res.json(result);
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
                if (result && result !== 0)
                    res.json(result)
                else 
                    res.status(500).json({ "msg": "Error Interno del servidor" });                    
            });
        }
        else
            res.status(400).json({ "msg": "La matrícula no existe" });
    });
}
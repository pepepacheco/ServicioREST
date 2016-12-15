var alumno = require('../model/alumno.js');

module.exports.get = function (req, res, next) {
    alumno.loadAll(function (err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({ "msg": "No hay datos" });
    });
}

module.exports.getId = function (req, res, next) {
    var id = req.body.id;
    alumno.loadId(id, function (err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({ "msg": "No hay datos" });
    });
}

module.exports.getDni = function (req, res, next) {
    var dni = req.params.dni;
    alumno.loadDni(dni, function (err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({ "msg": "No hay datos" });
    });
}

module.exports.getName = function (req, res, next) {
    var nombre = req.params.nombre;
    alumno.loadName(nombre, function (err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({ "msg": "No hay datos" });
    });
}

module.exports.post = function (req, res, next) {
    var InsertStudient = {
        "dni": req.body.dni,
        "nombre": req.body.nombre,
        "apellidos": req.body.apellidos,
        "email": req.body.email
    }

    if (alumno.validateDNI(InsertStudient.dni)) {
        if (InsertStudient.nombre.match(/^[A-Z][a-zA-Z_áéíóúñ\s-]{3,20}$/)) {
            if (InsertStudient.apellidos.match(/^[A-Z][a-zA-Z_áéíóúñ\s]{3,40}$/)) {
                if (InsertStudient.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)) {

                    alumno.addStudent(InsertStudient, function (err, result) {
                        if (result && result.length !== 0)
                            res.json(result);
                        else
                            res.status(400).json({ "msg": "El alumno ya existe" });
                    });

                }
                else
                    res.status(400).json({ "msg": "e-mail incorrecto" });
            }
            else
                res.status(400).json({ "msg": "apellidos incorrectos" });
        }
        else
            res.status(400).json({ "msg": "nombre incorrecto" });
    }
    else
        res.status(400).json({ "msg": "DNI incorrecto" });

}

module.exports.put = function (req, res, next) {
    var UpdateOrInsertStudient = {
        "dni": req.body.dni,
        "nombre": req.body.nombre,
        "apellidos": req.body.apellidos,
        "email": req.body.email
    }

    if (alumno.validateDNI(UpdateOrInsertStudient.dni)) {
        if (UpdateOrInsertStudient.nombre.match(/^[A-Z][a-zA-Z_áéíóúñ\s-]{3,20}$/)) {
            if (UpdateOrInsertStudient.apellidos.match(/^[a-zA-Z_áéíóúñ\s]{3,40}$/)) {
                if (UpdateOrInsertStudient.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)) {

                    alumno.addOrInsertStudent(UpdateOrInsertStudient, function (err, result) {
                        if (result && result.length !== 0)
                            res.json(result);
                        else
                            res.status(500).json({ "msg": "Error Interno del servidor" });
                    });

                }
                else
                    res.status(400).json({ "msg": "e-mail incorrecto" });
            }
            else
                res.status(400).json({ "msg": "apellidos incorrectos" });
        }
        else
            res.status(400).json({ "msg": "nombre incorrecto" });
    }
    else
        res.status(400).json({ "msg": "DNI incorrecto" });

}

module.exports.delete = function (req, res, next) {
    var id = req.params.id;
    if (alumno.validateDNI(dni)) {
        //Compruebo que el id exista en la base de datos
        alumno.loadId(id, function (err, result) {
            if (result && result.length !== 0) {
                alumno.deleteStudent(id, function (err, result) {
                    if (result && result.length !== 0)
                        res.json(result);
                    else
                        res.status(500).json({ "msg": "Error Interno del servidor" });
                });
            }
            else
                res.status(400).json({ "msg": "ID no corresponde a ningún alumno" });
        })
    }
    else
        res.status(400).json({ "msg": "DNI incorrecto" });
}
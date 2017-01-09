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
    var id = req.params.id;
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
        "DNI": req.body.DNI,
        "Nombre": req.body.Nombre,
        "Apellidos": req.body.Apellidos,
        "email": req.body.email
    }

    if (alumno.validateDNI(InsertStudient.DNI)) {
        if (InsertStudient.Nombre.match(/^[A-Z][a-zA-Z_áéíóúñ\s-]{3,20}$/)) {
            if (InsertStudient.Apellidos.match(/^[A-Z][a-zA-Z_áéíóúñ\s]{3,40}$/)) {
                if (InsertStudient.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)) {

                    alumno.addStudent(InsertStudient, function (err, result) {
                        if (result && result.length !== 0)
                            res.status(201).json(InsertStudient);
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
        "DNI": req.body.DNI,
        "Nombre": req.body.Nombre,
        "Apellidos": req.body.Apellidos,
        "email": req.body.email
    }

    if (alumno.validateDNI(UpdateOrInsertStudient.DNI)) {
        if (UpdateOrInsertStudient.Nombre.match(/^[A-Z][a-zA-Z_áéíóúñ\s-]{3,20}$/)) {
            if (UpdateOrInsertStudient.Apellidos.match(/^[a-zA-Z_áéíóúñ\s]{3,40}$/)) {
                if (UpdateOrInsertStudient.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)) {

                    alumno.addOrInsertStudent(UpdateOrInsertStudient, function (err, result) {
                        if (result && result.length !== 0) {
                            if (result[0][0].code === "200")
                                res.status(200).json(InsertStudient);
                            else if (result[0][0].code === "201")
                                res.status(201).json(InsertStudient);
                        }
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
    //Compruebo que el id exista en la base de datos
    alumno.loadId(id, function (err, result) {
        if (result && result.length !== 0) {
            alumno.deleteStudent(id, function (err, result) {
                if (result && result.length !== 0)
                    res.json(InsertStudient);
                else
                    res.status(500).json({ "msg": "Error Interno del servidor" });
            });
        }
        else
            res.status(400).json({ "msg": "ID no corresponde a ningún alumno" });
    });

}

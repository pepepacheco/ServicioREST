var alumno = require('../model/alumno.js');

module.exports.get = function(req, res, next) {
    alumno.loadAll(function (err, data) {
        if (data && data.length !== 0)     
            res.json(data);
        else
            res.status(404).json({"msg" : "No hay datos"});
    });
}

module.exports.getName = function(req, res, next) {
    var nombre = req.params.nombre;
    alumno.loadName(nombre, function(err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({"msg" : "No hay datos"});
    });
}

module.exports.post = function(req, res, next) {
    var InsertStudient = {
        "dni" : req.body.dni,
        "nombre" : req.body.nombre,
        "apellidos" : req.body.apellidos,
        "email" : req.body.email
    }

    if (alumno.validateDNI(InsertStudient.dni)) {
        if (InsertStudient.nombre.match(/^[A-Z][A-Za-z-]{3,20}$/)) {
            if (InsertStudient.apellidos.match(/^[A-Z][A-Za-z\s]{3,40}$/)) {
                if (InsertStudient.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)) {
                    alumno.addStudent(InsertStudient, function (err, result) {
                        if (result && result.length !== 0) {
                            res.json(result);
                        }
                        else
                            res.status(400).json({"msg" : "El alumno ya existe"});
                    });
                }
                else
                    res.status(400).json({"msg" : "e-mail incorrecto"});
            }
            else
                res.status(400).json({"msg" : "apellidos incorrectos"});
        }
        else 
            res.status(400).json({"msg" : "nombre incorrecto"});
    }
    else
        res.status(400).json({"msg" : "DNI incorrecto"});

}

module.exports.put = function(req, res, next) {
    
}

module.exports.delete = function(req, res, next) {
    
}
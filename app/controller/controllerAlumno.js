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
        "nombre" : req.body.nombre,
        "apellidos" : req.body.apellidos,
        "email" : req.body.email
    }
    if (InsertStudient.nombre && InsertStudient.apellidos && InsertStudient.email) {
        alumno.InsertStudient()
    }
    else
        res.status(400).json({"msg" : "Parámetros incorrectos"});
}

module.exports.put = function(req, res, next) {
    
}

module.exports.delete = function(req, res, next) {
    
}
var alumno = require('../model/alumno.js');

module.exports.get = function(req, res, next) {
    alumno.loadAll(function (err, data) {
        if (!err)     
            res.json(data);
        else
            res.json({"err" : "Error en la consulta"});
    });
}

module.exports.getNombre = function(req, res, next) {
    var nombre = req.params.nombre;
    alumno.loadName(nombre, function(err, data) {
        if (!err)
            res.json(data);
        else
            res.json({"err" : "Error en la consulta"})
    })
}

module.exports.post = function(req, res, next) {
    
}

module.exports.put = function(req, res, next) {
    
}

module.exports.delete = function(req, res, next) {
    
}
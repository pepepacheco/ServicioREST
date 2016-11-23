var asignatura = require('../model/asignatura.js');

module.exports.get = function(req, res, next) {
    asignatura.loadAll(function(err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({'msg' : 'No hay datos' });
    })
}

module.exports.getId = function(req, res, next) {
    var id = req.params.id;
    asignatura.loadId(id, function(err, data) {
        if (data && data.length !== 0)
            res.json(data);
        else
            res.status(404).json({"msg" : "No hay datos"});
    });
}

module.exports.post = function(req, res, next) {
    
}

module.exports.put = function(req, res, next) {
    
}

module.exports.delete = function(req, res, next) {
    
}
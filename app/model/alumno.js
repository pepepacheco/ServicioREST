var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    port : '3306',
    database : 'ServicioREST'
});

var alumnoModel = {};

alumnoModel.loadAll = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM Matricula', function(err, rows) {
        if (!err)
            callback(null, rows);
        else 
            callback(err, null);
        });
    }
}

alumnoModel.loadName = function (nombre, callback) {
    if (connection) {
        connection.query('SELECT * FROM Alumno WHERE nombre = ?', [nombre], function(err, rows) {
        if (!err)
            callback(null, rows);
        else 
            callback(err, null);
        });
    }
}

module.exports = alumnoModel;
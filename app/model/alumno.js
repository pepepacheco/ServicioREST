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

alumnoModel.loadName = function (name, callback) {
    if (connection) {
        connection.query('SELECT * FROM Alumno WHERE nombre = ?', [name], function(err, rows) {
            if (!err)
                callback(null, rows);
            else 
                callback(err, null);
        });
    }
}

alumnoModel.addStudent = function (student, callback) {
    if (connection) {
        connection.query('INSERT INTO Alumno SET ?', [student], function (err, result) {
            if (!err)
                callback(null, result);
            else
                callback(result, null);
        })
    }
}

module.exports = alumnoModel;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    port : '3306',
    database : 'ServicioREST'
});

var asignaturaModel = {};

asignaturaModel.loadAll = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM Asignatura', function (err, rows) {
            if (!err)
                callback(null, rows);
            else   
                callback(rows, null);
        });

    }
}

asignaturaModel.loadId = function (id, callback) {
    if (connection) {
        connection.query('SELECT * FROM Asignatura WHERE id = ?', [id], function (err, rows) {
            if (!err)
                callback(null, rows);
            else
                callback(err, null)
        })
    }
}

module.exports = asignatura;
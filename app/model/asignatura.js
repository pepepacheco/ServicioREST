var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'default',
    password: 'default',
    port: '3306',
    database: 'ServicioREST'
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
        connection.query('SELECT * FROM Asignatura WHERE ID = ?', [id], function (err, rows) {
            if (!err)
                callback(null, rows);
            else
                callback(err, null);
        });
    }
}

asignaturaModel.loadName = function (name, callback) {
    if (connection) {
        connection.query('SELECT * FROM Asignatura WHERE Nombre = ?', [name], function (err, rows) {
            if (!err)
                callback(null, rows);
            else
                callback(err, null)
        });
    }
}

asignaturaModel.loadCycle = function (cycle, callback) {
    if (connection) {
        connection.query('SELECT * FROM Asignatura WHERE Ciclo = ?', [cycle], function (err, rows) {
            if (!err)
                callback(null, rows);
            else
                callback(err, null);
        });
    }
}

asignaturaModel.createSubject = function (subject, callback) {
    if (connection) {
        connection.query('INSERT INTO Asignatura SET ?', [subject], function (err, rows) {
            if (!err)
                callback(null, rows);
            else
                callback(err, null);
        });
    }
}

asignaturaModel.addOrInsertSubject = function (subject, callback) {
    if (connection) {
        connection.query('CALL putAsignatura(' + mysql.escape(subject.nombre) + ', ' + mysql.escape(subject.ciclo) + ', '
            + mysql.escape(subject.curso) + ', ' + mysql.escape(subject.horas) + ')', function (err, result) {
                if (!err)
                    callback(null, result);
                else
                    callback(err, null);
            });
    }
}

asignaturaModel.deleteSubject = function (id, callback) {
    if (connection) {
        connection.query('DELETE FROM Asignatura WHERE ID = ? ', [id], function (err, result) {
            if (!err)
                callback(null, result);
            else
                callback(err, null);
        });
    }
}

module.exports = asignaturaModel;
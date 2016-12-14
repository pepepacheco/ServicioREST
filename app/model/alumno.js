var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'ServicioREST'
});

var alumnoModel = {};

alumnoModel.loadAll = function (callback) {
    if (connection) {
        connection.query('SELECT DNI, Nombre, Apellidos, email FROM Alumno', function (err, rows) {
            if (!err)
                callback(null, rows);
            else
                callback(err, null);
        });
    }
}

alumnoModel.loadDni = function (dni, callback) {
    if (connection) {
        connection.query('SELECT DNI, Nombre, Apellidos, email FROM Alumno WHERE DNI = ?', [dni], function (err, rows) {
            if (!err)
                callback(null, rows);
            else
                callback(err, null);
        });
    }
}

alumnoModel.loadName = function (name, callback) {
    if (connection) {
        connection.query('SELECT DNI, Nombre, Apellidos, email FROM Alumno WHERE Nombre = ?', [name], function (err, rows) {
            if (!err)
                callback(null, rows);
            else
                callback(err, null);
        });
    }
}

alumnoModel.validateDNI = function (dni) {
    var _numbers;
    var _letter;
    var _validLetter
    var regex = /^\d{8}[a-zA-Z]$/;

    if (regex.test(dni)) {
        _numbers = dni.substr(0, dni.length - 1);
        _letter = dni.substr(dni.length - 1, 1);
        _numbers %= 23;
        _validLetter = 'TRWAGMYFPDXBNJZSQVHLCKET';
        _validLetter = _validLetter.substr(_numbers, 1);

        if (_letter.toUpperCase() === _validLetter)
            return true;
        else
            return false;
    }
    else
        return false;
}

alumnoModel.addStudent = function (student, callback) {
    if (connection) {
        connection.query('INSERT INTO Alumno SET ?', [student], function (err, result) {
            if (!err)
                callback(null, result);
            else
                callback(err, null);
        });
    }
}

alumnoModel.addOrInsertStudent = function (student, callback) {
    if (connection) {
        connection.query('CALL putAlumno(' + mysql.escape(student.dni) + ', ' + mysql.escape(student.nombre) + ', '
            + mysql.escape(student.apellidos) + ', ' + mysql.escape(student.email) + ')', function (err, result) {
                if (!err)
                    callback(null, result);
                else
                    callback(err, null);

            });
    }
}

alumnoModel.deleteStudent = function (dni, callback) {
    if (connection) {
        connection.query('DELETE FROM Alumno WHERE DNI = ?', [dni], function (err, result) {
            if (!err)
                callback(null, result);
            else
                callback(err, null);
        });
    }
}

module.exports = alumnoModel;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'default',
    password: 'default',
    port: '3306',
    database: 'ServicioREST'
});

var matriculaModel = {};

matriculaModel.loadAll = function (callback) {
    if (connection) {
        var query = 'SELECT Alumno.Nombre, Alumno.Apellidos, Asignatura.Nombre "Asignatura", Matricula.fecha_inicio, \
         Matricula.fecha_fin FROM Alumno, Asignatura, Matricula WHERE Alumno.ID = Matricula.ID_alumno  \
         AND Asignatura.ID = Matricula.ID_asignatura';

        connection.query(query, function (err, rows) {
            if (!err)
                callback(null, rows);
            else
                callback(err, null);
        });
    }
}

matriculaModel.loadForStudent = function (dniAlumno, callback) {
    if (connection) {
        var query = 'SELECT Alumno.Nombre, Alumno.Apellidos, Asignatura.Nombre "Asignatura", Matricula.fecha_inicio, \
         Matricula.fecha_fin FROM Alumno, Asignatura, Matricula WHERE Alumno.ID = Matricula.ID_alumno  \
         AND Asignatura.ID = Matricula.ID_asignatura AND Alumno.DNI = ?';

        connection.query(query, [dniAlumno], function (err, rows) {
            if (!err)
                callback(null, rows);
            else {
                console.log(err)
                callback(err, null);
            }
        });
    }
}

matriculaModel.loadForSubject = function (nombre, callback) {
    if (connection) {
        var query = 'SELECT Alumno.Nombre, Alumno.Apellidos, Asignatura.Nombre "Asignatura", Matricula.fecha_inicio, \
         Matricula.fecha_fin FROM Alumno, Asignatura, Matricula WHERE Alumno.ID = Matricula.ID_alumno  \
         AND Asignatura.ID = Matricula.ID_asignatura AND Asignatura.Nombre = ?';

        connection.query(query, [nombre], function (err, rows) {
            if (!err)
                callback(null, rows);
            else
                callback(err, null);
        });
    }
}

matriculaModel.loadIds = function (idAlumno, idAsignatura, callback) {
    if (connection) {
        connection.query('SELECT * FROM Matricula WHERE ID_alumno = ? AND ID_asignatura = ?', [idAlumno, idAsignatura], function (err, rows) {
            if (!err)
                callback(null, rows);
            else
                callback(err, null);
        });
    }
}

matriculaModel.addEnrollment = function (enrollment, callback) {
    if (connection) {
        connection.query('INSERT INTO Matricula SET ?', [enrollment], function (err, result) {
            if (!err)
                callback(null, result);
            else
                callback(err, null);
        });
    }
}

matriculaModel.addOrInsertEnrollment = function (enrollment, callback) {
    if (connection) {
        connection.query('CALL putMatricula(' + mysql.escape(enrollment.ID_alumno) + ', ' + mysql.escape(enrollment.ID_asignatura) + ', '
            + mysql.escape(enrollment.fecha_inicio) + ', ' + mysql.escape(enrollment.fecha_fin) + ')', function (err, result) {
                if (!err)
                    callback(null, result);
                else
                    callback(err, null);
            });
    }
}

matriculaModel.deleteEnrollment = function (idAlumno, idAsignatura, callback) {
    if (connection) {
        connection.query('DELETE FROM Matricula WHERE ID_alumno = ? AND ID_asignatura = ?', [idAlumno, idAsignatura], function (err, result) {
            if (!err)
                callback(null, result);
            else
                callback(err, null);
        });
    }
}

module.exports = matriculaModel;
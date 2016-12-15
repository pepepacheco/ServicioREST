var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'default',
    password: 'default',
    port: '3306',
    database: 'ServicioREST'
});
var fs = require('fs');

if (process.argv[2] === 'create') {
    //start connection
    connection.connect();

    //create alumno
    var createAlumno = 'CREATE TABLE IF NOT EXISTS Alumno ( \
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    DNI VARCHAR(9) UNIQUE NOT NULL, \
    Nombre VARCHAR(20) NOT NULL, \
    Apellidos VARCHAR(50) NOT NULL, \
    email VARCHAR(30) NOT NULL \
    );'
    connection.query(createAlumno, function (err, rows) {
        if (!err)
            console.log(rows);
        else
            console.log(err);

    });

    //create asignatura
    var createAsignatura = 'CREATE TABLE IF NOT EXISTS Asignatura ( \
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    Nombre VARCHAR(60) UNIQUE NOT NULL, \
    Ciclo VARCHAR(60) NOT NULL, \
    Curso VARCHAR(10) NOT NULL, \
    Horas int NOT NULL DEFAULT 0\
    );'
    connection.query(createAsignatura, function (err, rows) {
        if (!err)
            console.log(rows);
        else
            console.log(err);
    });

    //create matricula
    var createMatricula = 'CREATE TABLE IF NOT EXISTS Matricula ( \
    ID_alumno INT NOT NULL, \
    ID_asignatura INT NOT NULL, \
    fecha_inicio DATE NOT NULL, \
    fecha_fin DATE NOT NULL, \
    FOREIGN KEY (ID_alumno) REFERENCES Alumno(ID) ON DELETE CASCADE, \
    FOREIGN KEY (ID_asignatura) REFERENCES Asignatura(ID) ON DELETE CASCADE \
    );'
    connection.query(createMatricula, function (err, rows) {
        if (!err)
            console.log(rows);
        else
            console.log(err);
    });

    //close connection
    connection.end();
}
else if (process.argv[2] === 'insert') {
    connection.connect();
    fs.readFile('./datos/alumnos.json', 'UTF-8', function (err, alumn) {
        if (!err) {
            fs.readFile('./datos/asignaturas.json', 'UTF-8', function (err, asign) {
                if (!err) {
                    fs.readFile('./datos/matriculas.json', 'UTF-8', function (err, matric) {
                        if (!err) {

                            //insert alumnos
                            var alumnos = JSON.parse(alumn);
                            for (alumno of alumnos) {
                                var insertAlumnos = 'INSERT INTO Alumno Values ( \
                                null, \
                                "' + alumno.dni + '", \
                                "' + alumno.nombre + '", \
                                "' + alumno.apellidos + '", \
                                "' + alumno.email + '" \
                                );';

                                connection.query(insertAlumnos, function (err, rows) {
                                    if (!err)
                                        console.log(rows);
                                    else
                                        console.log(err);
                                });
                            }

                            //insert asignaturas
                            var asignaturas = JSON.parse(asign);
                            for (asignatura of asignaturas) {
                                var insertAsignatura = 'INSERT INTO Asignatura Values ( \
                                null, \
                                "' + asignatura.nombre + '", \
                                "' + asignatura.ciclo + '", \
                                "' + asignatura.curso + '", \
                                ' + asignatura.horas + ' \
                                );';

                                connection.query(insertAsignatura, function (err, rows) {
                                    if (!err)
                                        console.log(rows);
                                    else
                                        console.log(err);
                                });
                            }

                            //insert matriculas
                            var matriculas = JSON.parse(matric);
                            for (matricula of matriculas) {
                                var insertMatriculas = 'INSERT INTO Matricula Values ( \
                                ' + matricula.id_asignatura + ', \
                                ' + matricula.id_alumno + ', \
                                "' + matricula.fecha_inicio + '", \
                                "' + matricula.fecha_fin + '" \
                                );';
                                connection.query(insertMatriculas, function (err, rows) {
                                    if (!err)
                                        console.log(rows);
                                    else
                                        console.log(err);
                                });
                            }
                            connection.end();
                        }
                    });
                }
            });
        }
    });
}

else if (process.argv[2] === 'delete') {
    connection.connect();

    //delete Matricula
    connection.query('DROP TABLE IF EXISTS Matricula', function (err, rows) {
        if (!err)
            console.log(rows);
        else
            console.log(err);
    });

    //delete Alumno
    connection.query('DROP TABLE IF EXISTS Alumno', function (err, rows) {
        if (!err)
            console.log(rows);
        else
            console.log(err);
    });

    //delete Asignatura
    connection.query('DROP TABLE IF EXISTS Asignatura', function (err, rows) {
        if (!err)
            console.log(rows);
        else
            console.log(err);
    });

    connection.end();
}

else {
    console.log('Introduzca el argumento:\n"create" para crear las tablas\n"insert" para insertar campos\n"delete" para eliminar las tablas');
} 

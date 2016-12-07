function alumno (nombre, apellidos, email) {
    var _nombre = nombre;
    var _apellidos = apellidos;
    var _email = email;

    return {
        getNombre : function () {return _nombre;},
        getApellidos : function () {return _apellidos;},
        getEmail : function () {return _email;}
    }
}

module.exports = alumno;
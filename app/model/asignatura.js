function asignatura (nombre, ciclo, curso, horas) {
    var _nombre = nombre;
    var _ciclo = ciclo;
    var _curso = curso;
    var _horas = horas;

    return {
        getNombre : function () {return _nombre;},
        getCiclo : function () {return _ciclo;},
        getCurso : function () {return _curso;},
        getHoras : function () {return _horas;}
    }
}

module.exports = asignatura;
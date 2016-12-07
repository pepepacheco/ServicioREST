function matricula (id_asignatura, id_alumno, fecha_inicio, fecha_fin) {
    var _id_asignatura = id_asignatura;
    var _id_alumno = id_alumno;
    var _fecha_inicio = fecha_inicio;
    var _fecha_fin = fecha_fin;

    return {
        getIdAsignatura : function () {return _id_asignatura;},
        getIdAlumno : function () {return _id_alumno;},
        getFechaInicio : function () {return _fecha_inicio;},
        getFechaFin : function () {return _fecha_fin;}
    }
}

module.exports = matricula;
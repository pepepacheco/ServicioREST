CREATE USER 'default'@'localhost' IDENTIFIED BY 'default';
GRANT CREATE, SELECT, INSERT, UPDATE, DELETE ON ServicioREST.* TO 'default'@'localhost';
GRANT EXECUTE ON PROCEDURE ServicioREST.putAlumno TO 'default'@'localhost';
GRANT EXECUTE ON PROCEDURE ServicioREST.putAsignatura TO 'default'@'localhost';
GRANT EXECUTE ON PROCEDURE ServicioREST.putMatricula TO 'default'@'localhost';

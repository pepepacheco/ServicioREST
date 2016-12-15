INSTRUCCIONES DE FUNCIONAMIENTO

1 -> Instalar Node
    -   $ sudo apt-get install nodejs
    -   $ sudo apt-get install npm

2 -> Instalar MYSQL
    -   $ sudo apt-get install mysql-server
    -   $ sudo mysql_secure_installation

3 -> Crear base de datos
    -   $ mysql -u root - p
    -   mysql> source scriptsSQL/createDatabase.sql

4 -> Crear usuario
    -   mysql> source scriptsSQL/createUser.sql

5 -> Instalar dependencias
    -   $ npm install

6 -> Crear tablas e Insertar campos de prueba
    $ node tablas.js create
    $ node tablas.js insert

    * el argumento "delete" borra todas las tablas

7 -> Crear procedures
    -   mysql> source scriptsSQL/putAlumno.sql
    -   mysql> source scriptsSQL/putAsignatura.sql
    -   mysql> source scriptsSQL/putMatricula.sql

8 -> Lanzar servidor
    -   $ npm start
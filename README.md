# INSTRUCCIONES DE FUNCIONAMIENTO

### 1 -> Instalar Node
```
    $ sudo apt-get update
    $ sudo apt-get install nodejs
    $ sudo apt-get install npm
```

### 2 -> Instalar MYSQL
```
    $ sudo apt-get install mysql-server
    $ sudo mysql_secure_installation
```

### 3 -> Crear base de datos
```
    $ mysql -u root - p
    mysql> source scriptsSQL/createDatabase.sql
```

### 4 -> Crear procedures
```
    $ mysql -u root - p
    mysql> use ServicioREST
    mysql> source scriptsSQL/putAlumno.sql
    mysql> source scriptsSQL/putAsignatura.sql
    mysql> source scriptsSQL/putMatricula.sql
```

### 5 -> Crear usuario
```
    mysql> source scriptsSQL/createUser.sql
```

### 6 -> Instalar dependencias
```
    $ npm install
```

### 7 -> Crear tablas e Insertar campos de prueba
```
    $ node tablas.js create
    $ node tablas.js insert

    (el argumento "delete" borra todas las tablas)
```

### 8 -> Lanzar servidor
```
    $ sudo ufw allow 3000 
    $ npm start
```

## Lanzar proxy de http a https (Opcional)
### Abrir puerto 4000
```
    $ sudo ufw allow 4000 
```
### Lanzar servidor proxy
```
    $ node bin/wwwhttp
```
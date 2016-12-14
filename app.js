var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routeIndex = require('./app/routes/index');
var routeAlumno = require('./app/routes/alumno');
var routeAsignatura = require('./app/routes/asignatura');
var routesMatricula = require('./app/routes/matricula');
var mysql = require('mysql');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));

// uncomment after placing your favicon in /public
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));


app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', routeIndex);
app.use('/alumno', routeAlumno);
app.use('/asignatura', routeAsignatura);
app.use('/matricula', routesMatricula);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

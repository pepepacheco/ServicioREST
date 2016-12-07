var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routeIndex = require('./routes/index');
var routeAlumno = require('./routes/alumno');
var routeAsignatura = require('./routes/asignatura');
var routesMatricula = require('./routes/matricula');

var app = express();

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routeIndex);
app.use('/alumno', routeAlumno);
app.use('/asignatura', routeAsignatura);
app.use('/matricula', routesMatricula);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
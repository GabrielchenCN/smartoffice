var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');

var paint = require('./routes/artDetail');
var manageWeichat = require('./routes/weichat');
var routes = require('./routes/index');
var users = require('./routes/users');
var exhi = require('./routes/exhi');
var art = require('./routes/art');
var beacons = require('./routes/beacons');
var galleries = require('./routes/galleries');
var pictures = require('./routes/pictures');

var app = express();

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');*/
var engines = require('consolidate');
app.engine('jade', engines.jade);
app.engine('ejs', engines.ejs);
app.set('view engine', 'jade');
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//router
app.use('/', routes);
app.use('/users', users);
app.use('/addnews', manageWeichat);
app.use('/paint', paint);
app.use('/exhi',exhi);
app.use('/art',art);
app.use('/beacons',beacons);
app.use('/galleries',galleries);
app.use('/pictures',pictures);




/*
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
*/

module.exports = app;

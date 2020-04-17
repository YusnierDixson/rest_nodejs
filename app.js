var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser=require('body-parser');
var favicon=require('serve-favicon');
var logger = require('morgan');


const db = require('./config/database');
const places=require('./routes/places');
const users=require('./routes/users');
const sessions=require('./routes/sessions');

db.connect();
var app = express();




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/places',places);
app.use('/users',users);
app.use('/sessions',sessions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;

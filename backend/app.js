var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/json', function(req, res){
  getInfo(req.headers['x-forwarded-for'] || req.connection.remoteAddress).then(a=>{
    res.json({
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      info: a
    
    })
  })

  
})


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
  res.render('error');
});

module.exports = app;


function getInfo(ip){
  return new Promise(function(resolve){
    request('http://api.db-ip.com/v2/free/'+ip, function(err, res, body){
    json = JSON.parse(body)
    resolve(json)
    })

  }
  )
}
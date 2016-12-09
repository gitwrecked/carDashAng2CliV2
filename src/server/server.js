require('rootpath')();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var config = require('./server/config');
var app = express();

// var static = __dirname.replace('server', 'dist');
// var debug = require('debug')('http')
//   , http = require('http')
//   , name = 'My App';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//point to client side index.html
app.use(express.static(__dirname+ '/../../dist'));

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo db connection error:'));
db.once('open', function() {
 console.log('mongo db is connected!');
});

var cats = require('./api/catsApi');
app.use('/cats', cats);

// all other routes are handled by Angular
app.get('/*', function (req, res) {
console.log(__dirname);
res.sendFile(__dirname + '../dist/index.html');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});

if (app.get('env') === 'development')
{
app.listen(3000, function () {
// debug('listening in 3000 using debug');
console.log('Example app listening on port 3000!');
});
}
else{
app.listen(8080, function () {
console.log('Example app listening on port 8080!');
});
}
module.exports = app;
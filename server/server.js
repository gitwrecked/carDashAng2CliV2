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
//point to client side dist/index.html
// app.use(express.static(__dirname+ '/../client/dist'));
app.use(express.static(path.join(__dirname, '/../dist')));
app.set('mongo_uri', (process.env.MONGO_URI || 'mongodb://gitwrecked:!234Abcd@ds155727.mlab.com:55727/gw-car-dashboard'))
mongoose.connect(app.get('mongo_uri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo db connection error:'));
db.once('open', function() {
  console.log('mongo db is connected!');
});

var cats = require('./api/catsApi');
app.use('/cats', cats);

// all other routes are handled by Angular
app.get('/*', function (req, res) {
console.log('logging dirname in app.get /* : '+__dirname);
 res.sendFile(path.join(__dirname, '/../dist/index.html'));
// res.sendFile(__dirname + '/client/dist/index.html');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});

module.exports = app;
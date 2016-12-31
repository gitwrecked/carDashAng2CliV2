"use strict"; 

require('rootpath')();

const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const config       = require('./config');
const argv         = require('minimist')(process.argv.slice(2));
const app          = express();

const port = process.env.PORT || config.server.listenPort;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/../dist')));
app.set('mongo_uri', (process.env.MONGO_URI || config.db.url))
mongoose.connect(app.get('mongo_uri'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo db connection error:'));
db.once('open', function() {
  console.log('mongo db is connected!');
});

app.use('/api/v1/auth', require('./api/auth-api'));
app.use('/api/v1/purchase', require('./api/purchase-api'));
app.use('/api/v1/user', require('./api/user-api'));
app.use('/api/v1', require('./swagger-app'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

app.use(function(req, res, next) {
  const err  = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.set('port', port);
app.listen(app.get('port'), function() {
  console.log('Example app listening on port ' + app.get('port'));
});

module.exports = app;
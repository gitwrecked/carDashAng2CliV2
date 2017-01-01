'use strict';

const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const config     = require('./config');
const argv       = require('minimist')(process.argv.slice(2));
const swaggerApp = express();
const swagger    = require('swagger-node-express').createNew(swaggerApp);
const port       = process.env.PORT || config.server.listenPort;

swaggerApp.use(express.static(path.join(__dirname, '/../swagger')));

swagger.setApiInfo({
  title: 'CarDash API',
  description: 'CarDash API',
  termsOfServiceUrl: '',
  contact: 'gitwrecked5@gmail.com',
  license: '',
  licenseUrl: ''
});

swaggerApp.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../swagger/index.html'));
});

swagger.configureSwaggerPaths('', 'api-docs', '');
swagger.configure('http://localhost:'.concat(port), '1.0.0');

module.exports = swaggerApp;
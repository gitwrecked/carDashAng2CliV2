'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require(`./config/config.${process.env.NODE_ENV || 'development'}`);
const argv = require('minimist')(process.argv.slice(2));
const swaggerApp = express();
const swagger = require('swagger-node-express').createNew(swaggerApp);

swaggerApp.use(express.static(path.join(__dirname, '/api/doc')));

swagger.setApiInfo({
    title: 'CarDash API',
    description: 'CarDash API',
    termsOfServiceUrl: '',
    contact: 'gitwrecked5@gmail.com',
    license: '',
    licenseUrl: ''
});

swaggerApp.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './api/doc/index.html'));
});

swagger.configureSwaggerPaths('', 'api-docs', '');
swagger.configure('http://localhost:'.concat(process.env.PORT || config.server.listenPort), '1.0.0');

module.exports = swaggerApp;
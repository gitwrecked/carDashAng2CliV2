'use strict';

require('rootpath')();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require(`./config/config.${process.env.NODE_ENV || 'development'}`);
const argv = require('minimist')(process.argv.slice(2));
const cors = require('cors');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.set('MONGO_URI', (process.env.MONGO_URI || config.db.url))
mongoose.connect(app.get('MONGO_URI'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo db connection error:'));
db.once('open', () => {
    console.log('mongo db is connected!');
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
});

var corsOptions = {
    origin: function(origin, callback) {
        var isWhitelisted = config.server.whitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}
app.use(cors(corsOptions));

app.use('/api/v1/auth', require('./api/auth-api-v1'));
app.use('/api/v1/purchase', require('./api/purchase-api-v1'));
app.use('/api/v1/user', require('./api/user-api-v1'));
app.use('/', require('./swagger-app'));

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.set('PORT', process.env.PORT || config.server.listenPort);
app.listen(app.get('PORT'), () => {
    console.log('app listening on port ' + app.get('PORT'));
});

module.exports = app;
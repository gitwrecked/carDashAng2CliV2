var express = require('express'); 
var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/user');

var api = express.Router();

api.use(function(req, res, next) {
    var token = req.headers.cd_token;
    if (token) {
        jwt.verify(token, config.server.secret, function(err, decoded) {
            if (err) {
                return res.status(400).send({
                    msg: 'you must be logged in to perform this function...'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(400).send({
            msg: 'you must be logged in to perform this function...'
        });
    }
});

api.get('/', function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.error(err);
            return res.status(500).send({
                success: false,
                msg: 'failed to retrieve users'
            });
        }
        return res.status(200).send({
            success: true,
            users: users
        });
    });
});

module.exports = api;
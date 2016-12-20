var express = require('express'); 
var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/user');

var api = express.Router();

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

api.use(function(req, res, next) {
    var token = req.headers.cd_token;
    if (token) {
        jwt.verify(token, config.server.secret, function(err, decoded) {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    msg: 'User api.use JWT Error'
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

api.post('/', function(req, res) {
    User.update({email: req.body.email}, {$push: { purchases: req.body.purchase }}, function (err, numUpdated) {
  if (err) {
    console.log(err);
    return res.json({
                msg: 'failed to add purchase to user array...'
            });
  } else if (numUpdated) {
    console.log("numUpdated");
    console.log(numUpdated);
     return res.json({
                success: true,
                msg: 'purchase added successfully!'
            });
  } else {
    console.log('No document found with defined "find" criteria!');
  }
});
});

module.exports = api;
var express     = require('express'); 
var jwt         = require('jsonwebtoken');
var config      = require('../config');
var User        = require('../models/user');
var api         = express.Router();

api.get('/', function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.error(err);
            return res.status(500).send({
                success: false,
                msg: 'Failed to retrieve users'
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
                    msg: 'Unable to verify token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(400).send({
            msg: 'You must be logged in to perform this function...'
        });
    }
});

api.post('/', function(req, res) {
    User.replaceOne({email: req.body.user.email}, req.body.user, function (err, numUpdated) {
      if (err) {
        console.error(err);
        return res.status(500).send({
                msg: 'Failed to add user purchase'
            });
      } else if (numUpdated) {        
        console.log(numUpdated);
            return res.status(201).send({
                success: true,
                msg: 'Purchase added successfully!'
            });
      } else {
        return res.status(400).send({
                msg: 'No document found with defined "find" criteria!'
            });        
      }
    });
});

module.exports = api;
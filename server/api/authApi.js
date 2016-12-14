var express = require('express'); 
var jwt = require('jsonwebtoken');
var config = require('../config');
var bcrypt = require('bcrypt-nodejs'); 
var User = require('../models/user');

var api = express.Router();

api.post('/register', function(req, res) { 
    var newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    newUser.save(function(err) {
        if (err) {
            console.error(err);
            return res.json({
                msg: 'email already in use...'
            });
        }
        var token = jwt.sign({
            user: newUser.email
        }, config.server.secret, { 
            expiresIn: 86400
        });
        return res.json({
            success: true,
            msg: 'registered user!',
            token: token,
            email: newUser.email
        });
    });
});

api.post('/login', function(req, res) { 
    User.findOne({
            email: req.body.email
        },
        function(err, user) {
            if (err) {
                console.error(err);
                return res.json({
                    msg: 'error on login...'
                });
            }
            if (!user || !user.email || !user.password) {
                return res.json({
                    msg: 'check your email/password...'
                });
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.json({
                    msg: 'check your email/password...'
                });
            }

            var token = jwt.sign({
                user: user.email
            }, config.server.secret, { 
                expiresIn: 86400
            });
            return res.json({
                success: true,
                msg: 'logged in ' + user.email + '!',
                token: token,
                email: user.email,
                admin: user.admin
            });
        });
});

module.exports = api;
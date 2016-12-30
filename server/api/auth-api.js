var express = require('express');
var jwt     = require('jsonwebtoken');
var config  = require('../config');
var bcrypt  = require('bcrypt-nodejs');
var User    = require('../models/user');

var api = express.Router();

api.post('/register', function(req, res) {
  var newUser = new User({email: req.body.email, password: req.body.password});
  newUser.save(function(err) {
    if (err) {
      return res.status(401).send(
          {msg: 'A user with that email already exists'});
    }
    var token = jwt.sign(
        {user: newUser.email}, config.server.secret,
        {expiresIn: config.server.tokenExpires});
    return res.status(201).send({
      success: true,
      msg: 'Registered user successfully',
      cd_token: token,
      email: newUser.email
    });
  });
});

api.post('/login', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return res.status(500).send({msg: 'There was an error on login'});
    }
    if (!user || !user.email || !user.password) {
      return res.status(401).send({msg: 'The email or password do not match'});
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({msg: 'The email or password do not match'});
    }

    var token = jwt.sign(
        {user: user.email}, config.server.secret,
        {expiresIn: config.server.tokenExpires});
    return res.status(200).send({
      success: true,
      msg: 'Logged in user successfully',
      cd_token: token,
      email: user.email,
      admin: user.admin
    });
  });
});

module.exports = api;
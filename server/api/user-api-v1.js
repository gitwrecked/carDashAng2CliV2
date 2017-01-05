'use strict';

const express = require('express');
const jwt     = require('jsonwebtoken');
const config  = require('../config');
const User    = require('../models/user');
const api     = express.Router();

api.get('/', (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.error(err);
      return res.status(500).send(
          {success: false, msg: 'Failed to retrieve users'});
    }
    return res.status(200).send(
        {success: true, users: users, msg: 'Users retrieved successfully'});
  });
});

api.use((req, res, next) => {
  const token = req.headers.cd_token;
  if (token) {
    jwt.verify(token, config.server.secret, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(400).send({msg: 'Unable to verify token'});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send(
        {msg: 'You must be logged in to perform this '});
  }
});

api.get('/:email', (req, res) => {
  User.find({email: req.params.email}, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send(
          {success: false, msg: 'Failed to retrieve user'});
    }
    return res.status(200).send(
        {success: true, user: user, msg: 'User retrieved successfully'});
  });
});

api.post('/', (req, res) => {
  User.update(
      {email: req.body.email}, {$push: {purchases: req.body.purchase}},
      (err, numUpdated) => {
        if (err) {
          console.error(err);
          return res.status(500).send({msg: 'Failed to update user'});
        } else if (numUpdated) {
          return res.status(201).send(
              {success: true, msg: 'Updated user successfully'});
        } else {
          return res.status(400).send(
              {msg: 'No document found with defined "find" criteria!'});
        }
      });
});

api.put('/:email', (req, res) => {
  User.update({email: req.params.email}, req.body.user, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send({msg: 'Failed to update user'});
    } else {
      return res.status(201).send(
          {success: true, msg: 'Updated user successfully'});
    }
  });
});

api.delete('/:email', (req, res) => {
  User.findOneAndRemove({email: req.params.email}, {}, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send({msg: 'Failed to delete user'});
    } else {
      return res.status(200).send(
          {success: true, msg: 'User deleted successfully'});
    }
  });
});

module.exports = api;
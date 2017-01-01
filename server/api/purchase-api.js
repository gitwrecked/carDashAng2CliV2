'use strict';

const express  = require('express');
const jwt      = require('jsonwebtoken');
const config   = require('../config');
const Purchase = require('../models/purchase');
const api      = express.Router();

api.use((req, res, next) => {
  const token = req.headers.cd_token;
  if (token) {
    jwt.verify(token, config.server.secret, (err, decoded) => {
      if (err) {
        return res.status(400).send({msg: 'Unable to verify token'});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send(
        {msg: 'You must be logged in to perform this ...'});
  }
});

api.post('/', (req, res) => {
  let purchase = new Purchase({
    user: req.body.user,
    amount: req.body.amount,
    description: req.body.description,
    item: req.body.item
  });

  purchase.save((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send({msg: 'Failed to add purchase...'});
    } else {
      return res.status(201).send(
          {success: true, msg: 'Purchase added successfully!'});
    }
  });
});

api.get('/:purchase_id', (req, res) => {
  Purchase.findById(req.params.purchase_id, (err, purchase) => {
    if (err) {
      console.error(err);
      return res.status(500).send(
          {success: false, msg: 'Failed to retrieve purchase'});
    }
    return res.status(200).send({success: true, purchase: purchase});
  });
});

api.get('/user/:user', (req, res) => {
  Purchase.find(req.params.user, (err, purchases) => {
    if (err) {
      console.error(err);
      return res.status(500).send(
          {success: false, msg: 'Failed to retrieve purchases'});
    }
    return res.status(200).send({success: true, purchases: purchases});
  });
});

api.delete('/:purchase_id', (req, res) => {
  Purchase.remove({_id: req.params.purchase_id}, (err, purchase) => {
    if (err) {
      console.error(err);
      return res.status(500).send(
          {success: false, msg: 'Unable to delete purchase'});
    } else {
      return res.status(200).send(
          {success: true, msg: 'Successfully deleted purchase'});
    }
  });
});
module.exports = api;

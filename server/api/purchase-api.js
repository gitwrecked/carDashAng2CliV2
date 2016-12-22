var express  = require('express');
var jwt      = require('jsonwebtoken');
var config   = require('../config');
var Purchase = require('../models/purchase');

var api = express.Router();


api.use(function(req, res, next) {
  console.log('Entering use');
  var token = req.headers.cd_token;
  if (token) {
    jwt.verify(token, config.server.secret, function(err, decoded) {
      if (err) {
        return res.status(400).send({msg: 'Unable to verify token'});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send(
        {msg: 'You must be logged in to perform this function...'});
  }
});

api.post('/', function(req, res) {
  console.log('Entering purchase api 4 post after USE');
  var purchase = new Purchase({
    user: req.body.user,
    amount: req.body.amount,
    description: req.body.description,
    item: req.body.item
  });

  purchase.save(function(err) {
    if (err) {
      console.error(err);
      return res.status(500).send({msg: 'Failed to add purchase...'});
    } else {
      console.log('Purchase added successfully!');
      return res.status(201).send(
          {success: true, msg: 'Purchase added successfully!'});
    }
  });
});

api.get('/:purchase_id', function(req, res) {
  Purchase.findById(req.params.purchase_id, function(err, purchase) {
    if (err) {
      console.error(err);
      return res.status(500).send(
          {success: false, msg: 'Failed to retrieve purchase'});
    }
    return res.status(200).send({success: true, purchase: purchase});
  });
});

api.get('/user/:user', function(req, res) {
  Purchase.find(req.params.user, function(err, purchases) {
    if (err) {
      console.error(err);
      return res.status(500).send(
          {success: false, msg: 'Failed to retrieve purchases'});
    }
    return res.status(200).send({success: true, purchases: purchases});
  });
});

api.delete('/:purchase_id', function(req, res) {
  Purchase.remove({_id: req.params.purchase_id}, function(err, purchase) {
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

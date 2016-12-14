var express = require('express'); 
var jwt = require('jsonwebtoken');
var config = require('../config');
var Purchase = require('../models/purchase');

var api = express.Router();

api.get('/', function(req, res) {
    Purchase.find(function(err, purchases) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                msg: 'failed to retrieve all purchases'
            });
        }
        return res.json({
            success: true,
            purchases: purchases
        });
    });
});

api.use(function(req, res, next) {
    var token = req.headers.cd_token;
    if (token) {
        jwt.verify(token, config.server.secret, function(err, decoded) {
            if (err) {
                return res.json({
                    msg: 'you must be logged in to perform this function...'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            msg: 'you must be logged in to perform this function...'
        });
    }
});

api.post('/', function(req, res) {
    var purchase = new Purchase({
        user: req.body.user,
        amount: req.body.amount,
        description: req.body.description,
        item: req.body.item
    });

    purchase.save(function(err) {
        if (err) {
            console.error(err);
            return res.json({
                msg: 'failed to add purchase...'
            });
        } else {
            return res.json({
                success: true,
                msg: 'purchase added successfully!'
            });
        }
    });
});

api.get('/:purchase_id', function(req, res) {
    Purchase.findById(req.params.purchase_id, function(err, purchase) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                msg: 'failed to retrieve purchase'
            });
        }
        return res.json({
            success: true,
            purchase: purchase
        });
    });
});

api.get('/user/:user', function(req, res) {
    Purchase.find(req.params.user, function(err, purchases) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                msg: 'failed to retrieve purchases'
            });
        }
        return res.json({
            success: true,
            purchases: purchases
        });
    });
});

api.delete('/:purchase_id', function(req, res) {
    Purchase.remove({
        _id: req.params.purchase_id
    }, function(err, purchase) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                msg: 'unable to delete purchase'
            });
        } else {
            return res.json({
                success: true,
                msg: 'successfully deleted purchase'
            });
        }
    });
});

module.exports = api;
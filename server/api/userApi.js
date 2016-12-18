var express = require('express'); 
var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/user');

var api = express.Router();

api.get('/get', function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                msg: 'failed to retrieve users'
            });
        }
        return res.json({
            success: true,
            users: users
        });
    });
});

// post 
api.post('/post', function(req, res) {
    // console.log('entering user api 4 post before USE');
    // console.log(req.body.email);
    // console.log(req.body.purchase);
    // var collection = db.collection('users');
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
  //Close connection
  // db.close();
});
    // user.update(
    // { _email: req.body.email },
    // { $push: { purchases: req.body.purchase } }, function(err) {
    //     if (err) {
    //         console.error(err);
    //         return res.json({
    //             msg: 'failed to add purchase to user array...'
    //         });
    //     } else {
    //         console.log('purchase added successfully to User array!');
            // return res.json({
            //     success: true,
            //     msg: 'purchase added successfully!'
            // });
    //     }
    // });
});

// db.students.update(
//    { _email: "raptor@gmail.com" },
//    { $push: { scores: 89 } }
// )


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

api.get('/', function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                msg: 'failed to retrieve users'
            });
        }
        return res.json({
            success: true,
            users: users
        });
    });
});

module.exports = api;
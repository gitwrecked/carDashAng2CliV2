// cat api ===================
// restful api routes for any backend calls
// front end does not connect to mongo libraries, therefore api routes needed
var express = require('express'); // modules 
// var jwt = require('jsonwebtoken');
// var config = require('server/config');
var Cats = require('../models/cats');

var api = express.Router();

// authentication block, 
// place api routes that do not need to be authenticated above this
// api.use(function(req, res, next) {
//     var token = req.headers.rb_token;
//     if (token) {
//         jwt.verify(token, config.server.secret, function(err, decoded) {
//             if (err) {
//                 return res.json({
//                     msg: 'you must be logged in to perform this function...'
//                 });
//             } else {
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//         return res.json({
//             msg: 'you must be logged in to perform this function...'
//         });
//     }
// });


// var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
// console.log('Client IP:', ip);

//retrieve all cats
api.get('/get', function(req, res) {
    console.log('inside cats/get server route');
    Cats.find(function(err, cats) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                msg: 'failed to retrieve all cats'
            });
        }
        console.log('cats: '+cats);
        return res.json({
            success: true,
            cats: cats
        });
    });
});

//retrieve cat based on ID
api.get('/:cat_id', function(req, res) {
    Cats.findById(req.params.cat_id, function(err, cat) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                msg: 'failed to retrieve cat'
            });
        }
        return res.json({
            success: true,
            cat: cat
        });
    });
});

api.delete('/:cat_id', function(req, res) {
    Cats.remove({
        _id: req.params.cat_id
    }, function(err, cat) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                msg: 'unable to delete cat'
            });
        } else {
            return res.json({
                success: true,
                msg: 'successfully deleted cat'
            });
        }
    });
});


api.post('/post', function(req, res) {
    var newCats = new Cats({
        name: req.body.name,
        cat: JSON.stringify(req.body)
    });
    // var fluffy = new Cats({ name: 'spike' });
    newCats.save(function(err) {
        if (err) {
            console.error(err);
            return res.json({
            msg: 'failed to upload cat...'
            });
        }
        return res.json({
            success: true,
            msg: 'cat upload successful',
            kitten: req.body
        });
    });
});

module.exports = api;
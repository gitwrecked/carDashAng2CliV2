// resume model ===================
// contains the structure of the backend resume object.
// need to define a schema and associated model to implement
var mongoose = require('mongoose'); // grab the mongoose module
// var resumeSchema = new mongoose.Schema({ // mongoose schema to hold doc structure
//     email: {
//         type: String,
//         required: true
//     },
//     resume: String,
//     ver: Number,
//     created_at: Date,
//     updated_at: Date
// });

var catsSchema = mongoose.Schema({
    name: String
});



module.exports = mongoose.model('Cats', catsSchema); // set in module.exports for reuse
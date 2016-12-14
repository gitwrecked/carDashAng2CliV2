var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
    name: String,
    amount: Number,
    desc: String
});

var Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
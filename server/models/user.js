"use strict"; 

const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

let userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: {type: Boolean, default: false},
  purchases: {type: Array},
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', function(next) {
  mongoose.models.User.findOne({email: this.email}, function(err, user) {
    if (user) {
      console.log(user);
      next(new Error('user', 'email already in use'));
    } else {
      next();
    }
  });
});

userSchema.pre('save', function(next) {
  let currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password);

  next();
});

module.exports =
    mongoose.model('User', userSchema);  // set in module.exports for reuse
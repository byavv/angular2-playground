'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  username: {
    type: String,
    unique: 'Username already exists',
    required: 'Please fill in a username',
    trim: true
  },
  cars: [{
    type: Schema.ObjectId,
    ref: 'Car'
  }]
});


module.exports = mongoose.model('User', UserSchema);
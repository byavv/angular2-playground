'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ModelSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  manufacter: {
    type: Schema.ObjectId,
    ref: 'Manufacter'
  }
});

module.exports = mongoose.model('Model', ModelSchema);
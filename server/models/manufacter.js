'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ManufacterSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  models: [{
    type: Schema.ObjectId,
    ref: 'Model'
  }]
});

module.exports = mongoose.model('Manufacter', ManufacterSchema);
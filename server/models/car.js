'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var CarsSchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    added: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    color: {
        type: String,
        default: '',
        trim: true
    },
    milage: {
        type: Number,
        default: 0,
    },
    images: [{
        type: String
    }],
    price: {
        type: Number,
        default: 0,
    },
    year: {
        type: Number,
        default: 2015,
    },
    manufacter: {
        type: String,
        default: '',
        trim: true
    },
    gear:{
        type: String,
        default: 'manual',
        trim: true
    },
    engine:{
        type: String,
        default: 'petrol',
        trim: true
    },
    model: {
        type: String,
        default: '',
        trim: true
    },
    owner: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Car', CarsSchema);
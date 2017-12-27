'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Code = require('../lib/error_code');
const Promise = require("bluebird");
Promise.promisifyAll(bcrypt);

var FoodSchema = new mongoose.Schema({
 
food_price: {
    type: Number,
    required: [true, 'food_price is required'],
 },
  shop_id:{
    type:String,
    required:[true,' shop_id is required'],
    index:true
  },
    food_name: {
      type:String,
      required:[true,' food_name is required'],
      index:true
    },
    type:{
      type:Array,
      required:[true,' type is required'],
    },
    food_type:{
        type:String,
        required:[true,' food_type is required'],
    },
    food_img: {
        type: Array,
        required: [true, 'food_img is required'],
    },
    our_ratings: {
      type: Number,
      required: [true, 'food_img is required'],
   },
    food_describe: {
      type: String,
      required: [true, 'shop_info is required'],
  },
    created_at: Number,
    updated_at: Number
}, {
    minimize: false
});

FoodSchema.set('toJSON', {
    getters: true,
    virtuals: false,
    transform: function(doc, ret, options) {
        delete ret.__v;
    }
});

module.exports = mongoose.model('Food', FoodSchema);
'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Code = require('../lib/error_code');

const Promise = require("bluebird");
Promise.promisifyAll(bcrypt);

var ShopSchema = new mongoose.Schema({
    vip_time: {
        type: mongoose.Schema.Types.Mixed,
        default:{}
    },
    uid:{
      type:String,
      required:[true,' uid is required'],
      index:true
    },
    shop_name:{

        type:String,
        required:[true,' shop_name is required'],
        index:true
        
    },
    shop_num:{
        type: Number,
        required: [true, 'shop_num is required'],
    },
    shop_imgs: {
        type: String,
        required: [true, 'shop_imgs is required'],
    },
    zf_pay: {
        type: String,
    },
    wx_pay: {
        type: String,
    },
    shop_info: {
      type: String,
      required: [true, 'shop_info is required'],
  },
    created_at: Number,
    updated_at: Number
}, {
    minimize: false
});

ShopSchema.set('toJSON', {
    getters: true,
    virtuals: false,
    transform: function(doc, ret, options) {
        delete ret.__v;
    }
});

module.exports = mongoose.model('Shop', ShopSchema);
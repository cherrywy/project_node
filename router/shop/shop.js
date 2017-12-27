const router = require('express').Router({ mergeParams: true })
const Joi = require('joi')
const common = require('../../common')
const log = require('../../models/log4js.js')
const logger = log.log4js.getLogger('service');
const shop = require('../../lib/shop/shop')
const lodash = require('lodash')

router.post('/new.json', (req, res, next) => {

    let schema = Joi.object().keys({
        uid:Joi.string().required(),
        shop_id:Joi.string(),
        shop_num: Joi.number().required(),
        vip_time: Joi.object().required(),
        shop_name: Joi.string().required(),
        shop_imgs:Joi.string().required(),
        shop_info:Joi.string().required(),
        wx_pay:Joi.string(),
        zf_pay:Joi.string(),
    });
    req.mgrHook.validate(schema);
    req.mgrHook.set(shop.new(req.body));
    next();
})

router.post('/find.json', (req, res, next) => {

  let schema = Joi.object().keys({
      uid:Joi.string(),
  });
  req.mgrHook.validate(schema);

  req.mgrHook.set(shop.find(req.body));
  next();
})


router.post('/remove.json', (req, res, next) => {
    let schema = Joi.object().keys({
        uid:Joi.string().required(),
    });
    req.mgrHook.validate(schema);
    req.mgrHook.set(shop.remove(req.body));
    next();
  })
module.exports = router
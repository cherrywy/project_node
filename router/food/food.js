const router = require('express').Router({ mergeParams: true })
const Joi = require('joi')
const common = require('../../common')
const log = require('../../models/log4js.js')
const logger = log.log4js.getLogger('service');
const food = require('../../lib/food/food')
const lodash = require('lodash')

router.post('/new.json', (req, res, next) => {
    let schema = Joi.object().keys({
        shop_id:Joi.string().required(),
        food_id:Joi.string(),
        food_name: Joi.string().required(),
        type: Joi.array().required(),
        food_type:Joi.string().required(),
        food_img:Joi.array().required(),
        our_ratings:Joi.number().required(),
        food_describe:Joi.string().required(),
        food_price:Joi.number().required(),
    });
    req.mgrHook.validate(schema);
    req.mgrHook.set(food.new(req.body));
    next();
})

router.post('/find.json', (req, res, next) => {

  let schema = Joi.object().keys({
      shop_id:Joi.string().required(),
      food_name:Joi.string()
  });
  req.mgrHook.validate(schema);

  req.mgrHook.set(food.find(req.body));
  next();
})

router.post('/food/find.json', (req, res, next) => {
    let schema = Joi.object().keys({
        shop_id:Joi.string().required(),
        food_id:Joi.string().required()
    });
    req.mgrHook.validate(schema);
    req.mgrHook.set(food.Foodfind(req.body));
    next();
  })
router.post('/remove.json', (req, res, next) => {
    let schema = Joi.object().keys({
        shop_id:Joi.string().required(),
        food_id:Joi.string().required(),
    });
    req.mgrHook.validate(schema);
  
    req.mgrHook.set(food.remove(req.body));
    next();
  })
module.exports = router
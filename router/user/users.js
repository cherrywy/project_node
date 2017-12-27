const router = require('express').Router({ mergeParams: true })
const Joi = require('joi')
const common = require('../../common')
const log = require('../../models/log4js.js')
const logger = log.log4js.getLogger('service');
const user = require('../../lib/user/user')
const lodash = require('lodash')
const upload = require('../../common/uploadfile')

router.post('/admin/new.json', (req, res, next) => {

    let schema = Joi.object().keys({
        password: Joi.string().required(),
        phone: Joi.string().required(),
    });
    req.mgrHook.validate(schema);

    let params = Object.assign({},req.body);
    lodash.set(params,"user_group",0)
    
    req.mgrHook.set(user.new(params));
    next();
})

router.post('/staff/new.json', (req, res, next) => {
    let schema = Joi.object().keys({
        password: Joi.string().required(),
        phone: Joi.string().required(),
        vip_time: Joi.object().required(),
    });
    req.mgrHook.validate(schema);

    let params = Object.assign({},req.body);
    lodash.set(params,"user_group",1)
    req.mgrHook.set(user.new(params));
    next();
})

router.post('/staff/update/vip_time.json', (req, res, next) => {
    let schema = Joi.object().keys({
        vip_time: Joi.object(),
        uid: Joi.string(),
    });
    req.mgrHook.validate(schema);
    let params = Object.assign({},req.body);
    lodash.set(params,"user_group",1)
    req.mgrHook.set(user.update(params));
    next();
})
router.post('/login.json', (req, res, next) => {

    let schema = Joi.object().keys({
        password: Joi.string().required(),
        phone: Joi.string().required(),
    });
    req.mgrHook.validate(schema);
    req.mgrHook.set(user.login(req.body));
    next();
})


router.post('/file/new.json',upload.file_upload)

module.exports = router
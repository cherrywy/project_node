const UserModle = require('../../models/user')
const Code = require('../../lib/error_code')
const user_router = {};

user_router.new = async(params) => {

    try {
        let {phone, password,user_group, vip_time} = params;
        let user
        if(vip_time){
            user = new UserModle({ "phone": phone, "password": password,"user_group":user_group ,'vip_time':vip_time})
        }else{
            user = new UserModle({ "phone": phone, "password": password,"user_group":user_group })
        }
        
        let doc = await UserModle.findOne({ "phone": phone })
        if (doc) {
            throw Code.USER_PHONE_HAS_REGISTERED
        }
        return await user.save();
        // ç
    } catch (e) {
        throw e;
    }
}

user_router.update = async(params) => {

    try {
        let {vip_time,uid} = params;
        let query_conditions={ 'vip_time':vip_time}
        await UserModle.findOneAndUpdate({ "_id": uid },query_conditions)
        let doc = await UserModle.findOne({ "_id": uid })
        return doc
        // ç
    } catch (e) {
        throw e;
    }
}
user_router.login= async(params) => {

    try {
        let {phone, password} = params;
        let user = new UserModle({ "phone": phone, "password": password })
        let result = await UserModle.findOne({ "phone": phone }).lean()
        result = {
            uid: result._id,
            phone: result.phone,
            user_group:result.user_group,
            vip_time:result.vip_time
        }
        
        return result;
        // ç
    } catch (e) {
        throw e;
    }
}

module.exports = user_router;
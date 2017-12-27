const ShopModle = require('../../models/shop')
const Code = require('../../lib/error_code')
const shop_router = {};

shop_router.new = async (params) => {
    try {
        let { shop_id, uid, vip_time, shop_name, shop_imgs, shop_info, shop_num, wx_pay, zf_pay } = params;
        let query_conditions = { "vip_time": vip_time, "shop_name": shop_name, "shop_imgs": shop_imgs, 'shop_info': shop_info, "uid": uid, 'shop_num': shop_num }

        if (wx_pay) {
            query_conditions['wx_pay'] = wx_pay
        }
        if (zf_pay) {
            query_conditions['zf_pay'] = zf_pay
        }
        let doc = await ShopModle.find({ "uid": uid }).lean()
        if (shop_id) {
            await ShopModle.findOneAndUpdate({ "_id": shop_id }, query_conditions)
        } else if(doc._id){
            await ShopModle.findOneAndUpdate({ "_id": doc._id }, query_conditions)
        }else {
            let shop = new ShopModle(query_conditions)
            await shop.save();
        }
        let result = await ShopModle.findOne({ "uid": uid })
        return result
    } catch (e) {
        throw e;
    }
}
shop_router.find = async (params) => {

    try {
        let { uid } = params;
        let doc
        if (uid) {
            doc = await ShopModle.find({ "uid": uid }).lean()
        } else {
            doc = await ShopModle.find({}).lean()
        }

        let result = doc.map(v => {
            v.shop_id = v._id
            delete v._id
            return v
        })

        return result
    } catch (e) {
        throw e;
    }
}
shop_router.remove = async(params) => {
    try {
        let {uid} = params;
        let query_conditions = {'uid':uid}
        let doc = await ShopModle.remove(query_conditions).lean()
        return doc
    } catch (e) {
        throw e;
    }
  }
module.exports = shop_router;
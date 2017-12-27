const FoodModle = require('../../models/food')
const Code = require('../../lib/error_code')
const food_router = {};

food_router.new = async(params) => {

    try {
        let {food_id,shop_id,food_name,type,food_type,food_img,our_ratings,food_describe,food_price} = params;
        let query_conditions={ 'shop_id':shop_id,'food_name':food_name,'type':type, 'food_type':food_type,'food_img':food_img,'our_ratings':our_ratings,'food_describe':food_describe,'food_price':food_price}
        if(food_id){
            await FoodModle.findOneAndUpdate({ "_id": food_id },query_conditions)
        }else{
            let food = new FoodModle(query_conditions)
            await food.save()
        }
        let doc = await FoodModle.findOne({ "shop_id": shop_id })
        return doc
    } catch (e) {
        throw e;
    }
}

food_router.find = async(params) => {
  try {
      let {food_name,shop_id,page = 1, limit = 20 } = params;
      let query_conditions = {'shop_id':shop_id}
      if(food_name){
        query_conditions[ "food_name"] =  { "$regex": food_name}
      }
      let doc = await FoodModle.find(query_conditions).skip((page - 1) * limit).limit(limit).lean()
      let result = doc.map(v=>{
        v.food_id = v._id
        delete v._id
        return v 
      })
      return result
  } catch (e) {
      throw e;
  }
}

food_router.Foodfind = async(params) => {
    try {
        let {food_id,shop_id} = params;
        let query_conditions = {'shop_id':shop_id,'_id':food_id}
        let doc = await FoodModle.find(query_conditions).lean()
        let result = doc.map(v=>{
          v.food_id = v._id
          delete v._id
          return v 
        })
        return result
    } catch (e) {
        throw e;
    }
  }
food_router.remove = async(params) => {
    try {
        let {food_id,shop_id} = params;
        let query_conditions = {'_id':food_id}
        let doc = await FoodModle.remove(query_conditions).lean()
        return doc
    } catch (e) {
        throw e;
    }
  }

module.exports = food_router;
const common_router = require('./common_router')
const router = new common_router();

router.use('/user', require('./user/users.js'))

router.use('/shop',require('./shop/shop'))
router.use('/food',require('./food/food'))

module.exports = router.done();
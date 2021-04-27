const controller = require('./controller');

module.exports = router => {
    router.get('/orders', controller.getOrders);
}
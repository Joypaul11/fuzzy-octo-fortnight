const controller = require('./controller');

module.exports = router => {
    router.get('/orders', controller.getOrders);

    router.put('/orders/:orderId', controller.editOrder);
}
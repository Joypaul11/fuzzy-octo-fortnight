const controller = {};
const OrdersRef = require('../../firebase');

controller.getOrders = async(req, res) => {
    let allOrders = await OrdersRef.once("value");
    allOrders = allOrders.val();
    res.status(200).json(allOrders);
}

module.exports = controller;
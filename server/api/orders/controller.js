const controller = {};
const OrdersRef = require('../../firebase');
const moment = require('moment');

controller.getOrders = async(req, res) => {
    let allOrders = await OrdersRef.once("value");
    allOrders = allOrders.val();
    res.status(200).json(allOrders);
}

controller.editOrder = async(req, res) => {
  await OrdersRef.child(req.params.orderId).update({
    bookingDate: moment.utc(req.body.bookingDate, 'YYYY-MM-DD').valueOf(),
    title: req.body.orderTitle
  })
  const updatedOrder = await OrdersRef.child(req.params.orderId).get();
  return res.status(200).json(updatedOrder);
}

module.exports = controller;
const controller = {};
const OrdersRef = require('../../firebase');
const moment = require('moment');

controller.getOrders = async(req, res) => {
  try{
    let allOrders = await OrdersRef.once("value");
    allOrders = allOrders.val();
    res.status(200).json(allOrders);
  } catch(err) {
    return res.status(500).json(err);
  }
}

controller.editOrder = async(req, res) => {
  try {
    await OrdersRef.child(req.params.orderId).update({
      bookingDate: moment.utc(req.body.bookingDate, 'YYYY-MM-DD').valueOf(),
      title: req.body.orderTitle
    })
    const updatedOrder = await OrdersRef.child(req.params.orderId).get();
    return res.status(200).json(updatedOrder);
  } catch(err) {
    return res.status(500).json(err);
  }
}

controller.addOrder = async(req, res) => {
  try {
    const orderId = await OrdersRef.push().getKey();
    await OrdersRef.child(orderId).set(req.body);
    return res.status(200).json(orderId);
  } catch(err) {
    return res.status(500).json(err);
  }
}

module.exports = controller;
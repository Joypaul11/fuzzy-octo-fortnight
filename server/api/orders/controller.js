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
  let theOrder = await (await OrdersRef.child(req.params.orderId).get()).exists();
  if (!theOrder) return res.status(500).json('Invalid request');
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
  // Validations
  if (!req.body) return res.status(500).json('Invalid request');
  let newOrder = {
    title: req.body.title,
    bookingDate: req.body.bookingDate,
    customer: req.body.customer,
    address: req.body.address
  }
  
  if (!newOrder.title || typeof newOrder.title !== 'string') return res.status(500).json('Invalid request');
  if (!newOrder.bookingDate || typeof newOrder.bookingDate !== 'number') return res.status(500).json('Invalid date');

  try {
    const orderId = await OrdersRef.push().getKey();
    await OrdersRef.child(orderId).set(req.body);
    return res.status(200).json(orderId);
  } catch(err) {
    return res.status(500).json(err);
  }
}

module.exports = controller;
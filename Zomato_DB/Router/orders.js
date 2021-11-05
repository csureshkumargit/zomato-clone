const express = require('express');
const route = express.Router();
const orderController = require('../Controller/orders');
route.post('/addorder', orderController.addOrders);
route.get('/:userId', orderController.getOrderByUserId);
module.exports = route;
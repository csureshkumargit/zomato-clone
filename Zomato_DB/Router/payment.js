const express = require('express');
const route = express.Router();
var paymentGatewayController = require('../Controller/PaymentGateway');
route.post('/payment', paymentGatewayController.payment);
route.post('/callback', paymentGatewayController.callback);
module.exports = route;
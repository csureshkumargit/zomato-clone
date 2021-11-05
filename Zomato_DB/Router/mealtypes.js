const express = require('express');
const route = express.Router();
const mealtypeController = require('../Controller/mealtypes');
route.get('/', mealtypeController.getAllMealtype);
module.exports = route;
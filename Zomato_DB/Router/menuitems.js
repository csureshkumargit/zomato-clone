const express = require('express');
const route = express.Router();
const menuItemController = require('../Controller/menuitems');
route.get('/:resId', menuItemController.getMenuItemsByresId);
module.exports = route;
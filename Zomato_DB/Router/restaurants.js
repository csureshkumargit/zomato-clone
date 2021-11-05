const express = require('express');
const route = express.Router();
const restaurantController = require('../Controller/restaurants');
route.get('/', restaurantController.getAllRestaurant);
route.get('/location/:locId', restaurantController.getRestaurantByLocId);
route.get('/:Id', restaurantController.getRestaurantById);
route.post('/filter', restaurantController.getRestaurantByFilter);
module.exports = route;
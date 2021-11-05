const express = require('express');
const route = express.Router();
const locationController = require('../Controller/locations');
route.get('/', locationController.getAllLocation);
module.exports = route;
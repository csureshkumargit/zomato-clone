const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RestaurantSchema = new Schema({


    location_id: {
        type: Number,
        required: true
    },

    cuisine_id: {
        type: Array,
        required: true
    },

    mealtype_id: {
        type: Number,
        required: true
    },
    min_price: {
        type: Number,
        required: true
    }

},
    {
        collection: 'restaurants',
        versionKey: false //here
    }

);

module.exports = mongoose.model('restaurants', RestaurantSchema, 'restaurants');
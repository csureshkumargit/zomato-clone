const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemsSchema = new Schema({


    name: {
        type: String,
        required: true
    },

    restaurantId: {
        type: String,
        required: true
    }

},
    {
        collection: 'items',
        versionKey: false //here
    }

);

module.exports = mongoose.model('menuitems', ItemsSchema, 'items');
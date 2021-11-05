const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({


    firstname: {
        type: String,
        required: false
    },

    lastname: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true

    }
},
    {
        collection: 'users',
        versionKey: false //here
    }

);

module.exports = mongoose.model('users', UserSchema, 'users');
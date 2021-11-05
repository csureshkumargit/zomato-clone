const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8090;
const location = require('./Router/locations');
const mealtype = require('./Router/mealtypes');
const restaurant = require('./Router/restaurants');
const menuitems = require('./Router/menuitems');
const users = require('./Router/users');
const orders = require('./Router/orders');
const payment = require('./Router/payment');

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to Zomato_clone_DB');
})
app.use('/location', location);
app.use('/mealtype', mealtype);
app.use('/restaurant', restaurant);
app.use('/menuitems', menuitems);
app.use('/users', users);
app.use('/orders', orders);
app.use('/api', payment);

mongoose.connect(process.env.SERVER_MONGO_URL).
    then(() => {
        app.listen(port, () => {
            console.log(`The service is running @ ${port}`);
        });
    }).catch(err => console.log('DB not connected'));

const ordersModel = require('../Model/orders');

exports.addOrders = (req, res) => {
    const { placedBy, placedByUserId, items, Amount, restaurantId } = req.body;
    const order = new ordersModel({
        placedBy, placedByUserId, placedOn: new Date(), items, Amount, restaurantId
    })

    order.save()
        .then((response) =>
            res.status(200).json({ Addedorder: response }))
        .catch(err => {
            res.status(400).json({ error_Message: err })
        })
}

exports.getOrderByUserId = (req, res) => {
    const { userId } = req.params;

    ordersModel.find({ placedByUserId: userId })
        .then((response) =>
            res.status(200).json({ orderByUserId: response }))
        .catch(err => {
            res.status(400).json({ error_Message: err })
        })
}

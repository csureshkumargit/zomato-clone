const menuitemsModel = require('../Model/menuitems');

exports.getMenuItemsByresId = (req, res) => {
    const { resId } = req.params;
    console.log(resId, req.params);
    menuitemsModel.find({ restaurantId: resId })
        .then((restaurantItems) =>
            res.status(200).json({ restaurant_By_Items: restaurantItems }))
        .catch(err => {
            res.status(400).json({ error_Message: err })
        })
}
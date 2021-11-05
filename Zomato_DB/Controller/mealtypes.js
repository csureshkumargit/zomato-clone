const mealtypeModel = require('../Model/mealtypes');
exports.getAllMealtype = (req, res) => {
    mealtypeModel.find()
        .then((mealtype) =>
            res.status(200).json({ meal_data: mealtype }))
        .catch(err => {
            res.status(400).json({ error_Message: err })
        })
}


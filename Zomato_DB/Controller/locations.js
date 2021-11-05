const locationModel = require('../Model/locations');
exports.getAllLocation = (req, res) => {
    locationModel.find()
        .then((location) =>
            res.status(200).json({ location_data: location }))
        .catch(err => {
            res.status(400).json({ error_Message: err })
        })
}

exports.getLocation = (req, res) => {
    res.json('HI');
}
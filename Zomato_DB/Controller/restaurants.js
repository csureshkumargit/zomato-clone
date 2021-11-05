const restaurantModel = require('../Model/restaurants');
exports.getAllRestaurant = (req, res) => {
    restaurantModel.find()
        .then((restaurant) =>
            res.status(200).json({ restaurant_data: restaurant }))
        .catch(err => {
            res.status(400).json({ error_Message: err })
        })
}

exports.getRestaurantByLocId = (req, res) => {
    const { locId } = req.params;
    console.log(locId, req.params);
    let currenthour = new Date().getHours();
    let mealtype = 1;

    if (currenthour >= 6 && currenthour < 11) {
        mealtype = 1;
    }
    else if (currenthour >= 11 && currenthour < 13) {
        mealtype = 2;
    }
    else if (currenthour >= 13 && currenthour < 16) {
        mealtype = 4;
    }
    else if (currenthour >= 16 && currenthour < 17) {
        mealtype = 5;
    }
    else if (currenthour >= 17 && currenthour < 23) {
        mealtype = 3;
    }
    else {
        mealtype = 6
    }

    restaurantModel.find({}).where({ location_id: locId, mealtype_id: 1 })
        .then((restaurant) =>
            res.status(200).json({ restaurant_loc_data: restaurant }))
        .catch(err => {
            res.status(400).json({ error_Message: err })
        })
}

exports.getRestaurantById = (req, res) => {
    const { Id } = req.params;
    //console.log(resId, req.params);
    restaurantModel.findById(Id)
        .then((restaurant) =>
            res.status(200).json({ restaurant_By_Id: restaurant }))
        .catch(err => {
            res.status(400).json({ error_Message: err })
        })
}

exports.getRestaurantByFilter = (req, res) => {
    let { mealtype, location, cuisine, lcost, hcost, sort, page } = req.body;
    sort = sort ? sort : 1;
    page = page ? page : 1;
    lcost = lcost ? lcost : 1;
    hcost = hcost ? hcost : 100000;
    cuisine = cuisine ? cuisine : [1, 2, 3, 4, 5];
    let filterRestObj = {};
    mealtype && (filterRestObj["mealtype_id"] = mealtype);
    location && (filterRestObj["location_id"] = location);
    cuisine && (filterRestObj["cuisine_id"] = cuisine);
    // lcost && hcost && (filterRestObj["lcost"] = lcost) && (filterRestObj["hcost"] = hcost);
    console.log(filterRestObj, { min_price: { $gte: lcost, $lte: hcost } });
    let object_per_page = 2;

    restaurantModel.find(filterRestObj).where({ min_price: { $gte: lcost, $lte: hcost }, cuisine_id: { $in: cuisine } })
        .sort({ min_price: sort })
        .then((restaurantfilter) => {
            let num_Of_Pages = [];
            for (i = 1; i <= Math.ceil(restaurantfilter.length / object_per_page); i++) {
                num_Of_Pages.push(i);
            }
            res.status(200).json({
                restaurant_filter: restaurantfilter.slice((page * object_per_page) - object_per_page, (page * object_per_page)), pagearr: num_Of_Pages,
                totalRestaurantCount: restaurantfilter.length
            })
            console.log(restaurantfilter)
        })
        .catch(err => {
            res.status(400).json({ error_Message: err })
        })
}


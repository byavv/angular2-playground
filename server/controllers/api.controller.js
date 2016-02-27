var mongoose = require("mongoose"),
    _ = require("lodash"),
    Car = mongoose.model("Car"),
    Manufacter = mongoose.model("Manufacter"),
    request = require('request'),
    qs = require('querystring'),
    Model = mongoose.model("Model");



function _createFilterQuery(request) {
    var countQuery = Car.count();
    if (request.model) {
        countQuery.where("model").equals(request.model);
    }
    if (request.manufacter) {
        countQuery.where("manufacter").equals(request.manufacter);
    }
    if (request.yearFrom) {
        countQuery.where("year").gte(parseInt(request.yearFrom));
    }
    if (request.yearUp) {
        countQuery.where("year").lte(parseInt(request.yearUp));
    }
    if (request.priceFrom) {
        countQuery.where("price").gte(parseInt(request.priceFrom));
    }
    if (request.colors && request.colors.length > 0) {
        countQuery.where("color").in(request.colors);
    }
    if (request.priceUp) {
        countQuery.where("price").lte(parseInt(request.priceUp));
    }
    if (request.milageUp) {
        countQuery.where("milage").lte(parseInt(request.milageUp));
    }
    if (request.milageFrom) {
        countQuery.where("milage").gte(parseInt(request.milageFrom));
    }
    return countQuery;
}

module.exports = {

    initCarsDefaults: function (req, res, next) {
        Manufacter.find()
            .exec()
            .then((manufacters) => {
                Car.aggregate([
                    {
                        $group: {
                            _id: {},
                            minYear: { $min: "$year" }
                        }
                    }
                ], (err, result) => {
                    if (err) throw err;
                    return res.status(200)
                        .send({
                            manufacters: manufacters,
                            minYear: result[0].minYear
                        });
                })
            }, (err) => {
                return res.sendStatus(500);
            })
    },

    getCarsByManufacter: function (req, res, next) {
        var query = Car.count();
        if (req.body.manufacter) {
            Manufacter.findOne({ name: req.body.manufacter })
                .populate('models', '-manufacter')
                .exec()
                .then((manufacter) => {
                    query.where("manufacter").equals(manufacter.name);

                    if (req.body.year) {
                        query.where("year").gte(parseInt(req.body.year));
                    }
                    if (req.body.priceFrom) {
                        query.where("priceFrom").lte(parseInt(req.body.priceFrom));
                    }
                    query.exec((err, count) => {
                        return res.status(200).send({ count: count, models: manufacter.models });
                    })
                })
        } else {
            query.exec((err, count) => {
                return res.status(200).send({ count: count });
            })
        }
    },

    getCarsCount: function (req, res, next) {
        var countQuery = _createFilterQuery(req.body);
        countQuery.exec((err, count) => {
            return res.status(200).send({ count: count });
        })
    },

    seachCars: function (req, res, next) {
        var query = _createFilterQuery(req.body);

        query.exec().then((count) => {
            if (req.body.sort) {
                query.sort(`${req.body.sort}`);
            }
            if (req.body.limit) {
                query.limit(parseInt(req.body.limit));
            }
            if (req.body.limit && req.body.page) {
                query.skip(parseInt(req.body.limit) * parseInt(req.body.page));
            }
            query.find().exec((err, cars) => {
                return res.status(200).send({ cars: cars, count: count });
            })
        })
    },
    getCarDetails: function (req, res, next) {
        if (req.params.id) {
            Car.findById(req.params.id)
                .exec()
                .then((car) => {
                    return res.status(200).send({ car: car });
                }, (err) => {
                    return res.sendStatus(500);
                })
        }
    },

    searchManufacters: function (req, res, next) {
        if (req.body.query) {
            var query = qs.stringify({ cmd: "getMakes" });
            request
                .get('http://www.carqueryapi.com/api/0.3/?' + query, (err, response, body) => {
                    if (!err && response.statusCode == 200) {
                        var makes = JSON.parse(body).Makes;
                        var filtered =
                            makes
                                .filter((make) => {
                                    return make.make_id.match(new RegExp(`^${req.body.query}`))
                                })
                                .map((val) => { return { name: val.make_display } })
                        return res.status(200).send(filtered);
                    }
                })
        }
        else {
            return res.status(200).send([]);
        }
    },

    checkEmailEquality: function (req, res) {
        console.log(req.body)
        if (req.body.email) {
            if (req.body.email === "my@email.com") {
                return res.status(200).send({ equal: false });
            }
            return res.status(200).send({ equal: true });
        } else {
            return res.status(500).send({ error: true });
        }
    }
} 

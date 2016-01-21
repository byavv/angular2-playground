'use strict';

var nconf = require("nconf"),
	api = require('../controllers/api.controller'),
    test = require('../controllers/test.controller');

module.exports = function (app) {
	app.route("/api/getcount").post(api.getCarsCount);	
	app.route("/api/initcarsdefaults").post(api.initCarsDefaults);	
	app.route("/api/getmanufactermodels").post(api.getCarsByManufacter);
	app.route("/api/seachcars").post(api.seachCars);
    app.route("/api/getcar/:id").get(api.getCarDetails);
    app.route("/api/searchManufacters").post(api.searchManufacters);
   
    app.route("/api/checkEmail").post(api.checkEmailEquality);
    
    
    
    app.route("/test/get").get(test.testGet);
    app.route("/test/post").post(test.testPost);
    app.route("/test/errpost").post(test.errtestPost);
    
   
}; 
module.exports = function (app) {
	//api
	require("./api.routes")(app);
	//default	
	app.route('*').get((req, res) => { res.render('index'); });		
};

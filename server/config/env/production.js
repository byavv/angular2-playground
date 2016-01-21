module.exports = {
	db: "mongodb://chip82:bigbull82@ds041623.mongolab.com:41623/multivision",
	httpPort: process.env.PORT || 3030,
	httpsPort: process.env.HTTPS_PORT || 3443,
	redis: {
		port: 6379,
		host: "localhost",
		url: null
	},
}
   
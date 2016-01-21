module.exports = {
	appName: 'MEAN starter',
	github: {
		clientID: 'ff63d88db28d7788461a',
		clientSecret: 'da743d7fd7fd1dc7d190b36549bed0609d3df7ee',
		callbackURL: '/auth/github/callback'
	},
	jwtAuth: {
		access_expiration_time: 360,
		refresh_expiration_time: 360000,
		secret: "my super secret word"
	},
	mailer: {
		from: 'MY MEAN APP NAME',
		options: {
			service: 'Gmail',
			auth: {
				user: 'aksslavvv@gmail.com',
				pass: 'tomaco982'
			}
		}
	},
	redis: {
		port: 6379,
		host: "localhost",
		url: null
	}
};

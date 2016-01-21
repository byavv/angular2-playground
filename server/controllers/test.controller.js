
module.exports = {

    testGet: function (req, res, next) {
        setTimeout(() => {
            return res.status(200).send({ data: "MY TEST DATA" });
        }, 1000)
    },
    testPost: function (req, res, next) {

        var token;
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0];
            var credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;

                if (req.body.query) {
                    setTimeout(() => {
                        return res.status(200).send({ query: req.body.query, authHeader: token });
                    }, 1000)
                } else {
                    setTimeout(() => {
                        return res.sendStatus(500);
                    }, 1000)
                }
            } else {
                setTimeout(() => {
                    return res.sendStatus(500);
                }, 1000)
            }
        }
    },
    errtestPost: function (req, res, next) {
        setTimeout(() => {
            return res.sendStatus(500);
        }, 3000)
    },
} 

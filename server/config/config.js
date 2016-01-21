"use strict";

var path = require("path"),
    fs = require("fs"),
    nconf = require("nconf"),
    chalk = require("chalk"),
    defaultConf = require("./defaults");

/**
 * Add environment specific configuration
 */
let config = {
    for: (env, done) => {
        let configPath = path.join(__dirname, './env');
        env = env.toLowerCase().trim();
        return new Promise((resolve, reject) => {
            fs.readdir(configPath, (err, files) => {
                if (err) reject(err);
                !!files && files.forEach((file) => {
                    if (file.match(new RegExp(env))) {
                        nconf.overrides(require(configPath + '/' + file));
                        console.info(chalk.underline(
                            `Configuration for ${chalk.white.bgBlue(env.toUpperCase()) } mode was built`
                            ));
                    }
                });
                resolve();
            });
        });
    }
};
/**
 * Default app configuration
 * Use: config.configure.for("development").then()..
 */
Object.defineProperty(config, "configure", {
    get: () => {
        nconf.argv().env();
        nconf.use("memory");
        nconf.defaults(defaultConf);
        return config;
    }
});
module.exports = config;
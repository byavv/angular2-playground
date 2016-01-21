"use strict";

var mongoose = require("mongoose"),
    path = require("path"),
    fs = require("fs"),
    chalk = require("chalk"),
    nconf = require("nconf");

/**
 * Configure mongoose
 */
exports.configure = function () {
    mongoose.connect(nconf.get("db"));
    let db = mongoose.connection;
    db.on('error', (err) => {
        throw err;
    });
    db.once('open', () => {
        console.log(chalk.green("Database opened"));
    });

    let modelsPath = path.join(__dirname, '../models');
    return new Promise((resolve, reject) => {
        fs.readdir(modelsPath, (err, modelsFiles) => {
            if (err) reject(err);
            !!modelsFiles && modelsFiles.forEach((file) => {
                if (/(.*)\.(js$)/.test(file)) {
                    require(path.join(modelsPath, file));
                }
            });
            console.info(`Models loaded.`);
            resolve();
        });
    })
};
exports.close = function (done) {
    mongoose.disconnect((err) => {
        console.info(chalk.yellow('Disconnected from MongoDB.'));
        done(err);
    });
}
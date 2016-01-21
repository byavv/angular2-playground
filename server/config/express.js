"use strict";

var express = require("express"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),     
    methodOverride = require("method-override"),
    path = require("path"),
    webpackAssets = require('express-webpack-assets');

module.exports = function (app) {
    var rootPath = process.cwd();
    app.set('views', rootPath + '/server/views');
    app.set('view engine', 'jade');
    if (process.env.NODE_ENV === "development") {
        app.use(webpackAssets('./build/webpack-assets.json', { devMode: true }));
        var webpack = require('webpack');
        var webpackConfig = require("./webpack")("development");
        var compiler = webpack(webpackConfig);
        app.use(require("webpack-dev-middleware")(compiler, {
            publicPath: '/build/',
            stats: { colors: true }
        }));
        app.use(morgan("dev"));
    } else {
        app.use(webpackAssets('./build/webpack-assets.json', { devMode: false }));
    }
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride("_method"));
    
    app.use('/build/', express.static(rootPath + '/build/'));
    app.use('/vendor/', express.static(rootPath + '/client/vendor'));
    app.use('/polymer/', express.static(rootPath + '/client/app/polymerElements'));
  
    app.use((err, req, res, next) => {
        var code = 500,
            msg = { message: "Internal Server Error" };
        switch (err.name) {
            case "UnauthorizedError":
                code = err.status;
                msg = undefined;
                break;
            case "BadRequestError":
            case "UnauthorizedAccessError":
            case "NotFoundError":
                code = err.status;
                msg = err.inner;
                break;
            default:
                break;
        }
        return res.status(code).json(msg);
    });
};


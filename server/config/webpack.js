var path = require('path'),
    webpack = require('webpack'),
    SaveHashes = require('assets-webpack-plugin'),
    BowerWebpackPlugin = require("bower-webpack-plugin"),
    NgminPlugin = require("ngmin-webpack-plugin");

module.exports = function (mode) {
    mode = mode || "development";
    var webpackConfig = {
        entry: {
            main: ['./client/app/bootstrap.ts'],
            vendors: [
                "es6-shim",
                "es6-promise",
                'reflect-metadata',
                "rxjs",
            // "zone.js",
                "zone.js/dist/zone-microtask",
                "zone.js/dist/long-stack-trace-zone",

                'angular2/common',
                'angular2/core',
                'angular2/router',
                'angular2/http',
                "angular2/platform/browser",
                'angular2/platform/common_dom',
                'lodash'
            ]
        },
        output: {
            path: path.join(__dirname, './build'),
            filename: '[name].js',
            publicPath: '/build/',
            pathinfo: false
        },
        noParse: [
            path.join("node_modules", '/angular2'),
            path.join("node_modules", '/lodash')
        ],
        module: {
            loaders: [
                { test: /\.html$/, loader: "raw" },
                { test: /\.css$/, loader: "style!css" },
                { test: /\.less$/, loader: "style!css!less" },
                { test: /\.scss$/, loader: "style!css!sass" },
                { test: /\.(png|jpg)$/, loader: "url?limit=25000" },
                { test: /\.jpe?g$|\.gif$|\.png$|\.wav$|\.mp3$|\.otf$/, loader: "file" },
                { test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" },
                { test: /\.ts$/, loader: 'ts' }
            ],
            postLoaders: [],
        },
        resolve: {
            extensions: ["", ".ts", ".js", ".less", ".sass"],
            modulesDirectories: ["node_modules"],
            alias: {
                'rx': 'rxjs',
                'moment': path.join(__dirname, "../../node_modules/moment/moment.js")
            },
           
        },
        plugins: [
            new webpack.DefinePlugin({
                _PROD_MODE: JSON.stringify(mode === "production"),
                _DEV_MODE: JSON.stringify((mode === "development")),
                _TEST_MODE: JSON.stringify((mode === "test"))
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(true),
            new webpack.ProvidePlugin({
                _: "lodash",
                $: "jquery",
                jQuery: "jquery"
            }),
            new BowerWebpackPlugin({
                modulesDirectories: ["client/vendor"],
                manifestFiles: ["bower.json", ".bower.json"],
                searchResolveModulesDirectories: false
            }),
            new SaveHashes({ path: "./build/" })
        ]
    };

    switch (mode) {
        case "test":
            webpackConfig.entry = {
                app: ["./client/app/app.module.ts"]
            };
            webpackConfig.module.postLoaders.push({
                test: /\.ts$/,
                exclude: /(tests|node_modules|.\client\vendor)\//,
                loader: 'istanbul-instrumenter'
            });
            webpackConfig.devtool = "hidden";
            break;
        case "production":
            webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js", Infinity));
            webpackConfig.plugins.push(
                new NgminPlugin(),
                new webpack.optimize.UglifyJsPlugin({
                    mangle: false,
                    compress: {
                        warnings: false
                    }
                }));
            webpackConfig.debug = false;
            webpackConfig.devtool = "false";
            break;
        case "development":
            webpackConfig.debug = true;
            webpackConfig.devtool = "source-map";
            webpackConfig.plugins.push(
                new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js", Infinity),
                new webpack.HotModuleReplacementPlugin());
            break;
    }
    return webpackConfig;
};
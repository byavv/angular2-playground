"use strict";

var express = require("express"),
  chalk = require("chalk"),
  config = require("./config/config"),
  mongooseConfig = require("./config/mongoose"),
  nconf = require("nconf");

const env = process.env.NODE_ENV || "development";

config
  .configure.for(env)
  .then(() => {
    return mongooseConfig.configure();
  })
  .then(() => { 
    //<--    
    let app = express();       
    require("./config/express")(app);
    require("./routes/routes")(app);
    let port = nconf.get("httpPort") || 3000;
    app.listen(port);
    console.info(chalk.green(`Server started on http port:  ${port}`));
  })
  .catch((error) => {
    console.error(chalk.bgRed.white(`Crush ${error}`));
  });
 

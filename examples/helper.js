var conf = require("../api_envs");

module.exports = {
  getConf: function(name) {
    var env = process.env.API_ENV || "development";
    return conf[env][name];
  }
}

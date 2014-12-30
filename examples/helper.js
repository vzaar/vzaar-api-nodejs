var conf = require("../api_envs"),
    Vzaar = require("../lib/vzaar");

module.exports = {
  getConf: function(name) {
    var env = process.env.API_ENV || "development";
    return conf[env][name];
  },

  init: function(){
    var api = new Vzaar.Api({ login: this.getConf("login"),
                              token: this.getConf("token"),
                              hostname: this.getConf("hostname"),
                              forceHttp: this.getConf("forceHttp") });
    return api;
  }
}

var conf = require("../api_envs"),
    Vzaar = require("../lib/vzaar");

module.exports = {
  getConf: function(name) {
    var env = process.env.API_ENV || "development";
    return conf[env][name];
  },

  init: function(_params){
    var params = _params || {},
        api = new Vzaar.Api({
          login: params.login || this.getConf("login"),
          token: params.token || this.getConf("token"),
          hostname: params.hostname || this.getConf("hostname"),
          forceHttp: params.forceHttp || this.getConf("forceHttp")
        });
    
    return api;
  }
}

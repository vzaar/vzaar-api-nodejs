var OAuth = require("oauth").OAuth,
    Core = require("./core"),
    url = require("url");

var Request = function(){};
Request.prototype = {
  get: function(callback){
    this._getOrDelete("get", this._callback(callback));
  },
  
  delete: function(callback){
    this._getOrDelete("delete", this._callback(callback));
  },
  
  post: function(callback, body){
    this._oauth().post(this._buildUrl(),
                       this.options.login,
                       this.options.token,
                       JSON.stringify(body),
                       "application/json",
                       this._callback(callback));
  },
  
  _oauth: function(callback){
    return new OAuth('','', '', '', '1.0A', null, 'HMAC-SHA1');
  },

  _getOrDelete: function(name, callback) {
    this._oauth()[name](this._buildUrl(),
                        this.options.login,
                        this.options.token,
                        callback);
  },

  _buildUrl: function() {
    var protocol = this.options.forceHttp ? "http" : "https";
    return url.format({ protocol: protocol,
                        hostname: this._hostname(),
                        pathname: this.path,
                        query: this.params });
  },

  _callback: function(callback) {
    return function(err, data, res) {
      if (err) {
        var statusCode = res ? res.statusCode : undefined;
        callback(statusCode, err);
      } else {
        callback(res.statusCode, Core.parseJson(data));
      }
    }
  },

  _hostname: function(){
    var hostname = this.options.hostname || "vzaar.com";
    return hostname.replace(/^(http\:\/\/|https\:\/\/)/, "");
  },
};

module.exports = Request;

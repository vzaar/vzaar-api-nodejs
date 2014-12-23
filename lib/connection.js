var OA = require("oauth"),
    url = require("url");

var Connection = function(options, callback){
  this.options = options;

  this.login = options.login;
  this.token = options.token;
  
  this._callback = callback;
  this.oauth = new OA.OAuth('','', '', '', '1.0A', null, 'HMAC-SHA1');
};

Connection.prototype = {
  get: function() {
    this.oauth.get(this.buildUrl(), this.login, this.token, this.callback());
  },

  buildUrl: function() {
    var protocol = this.options.forceHttp ? "http" : "https",
        _hostname = this.options.hostname || "vzaar.com", 
        hostname = _hostname.replace(/^(http\:\/\/|https\:\/\/)/, "");
    
    return url.format({ protocol: protocol,
                        hostname: hostname,
                        pathname: this.options.path,
                        query: this.options.params });
  },

  callback: function() {
    var _callback = this._callback;
    return function(err, data, res) {
      if (err) {
        _callback(res.statusCode, err);
      } else {
        _callback(res.statusCode, JSON.parse(data));
      }
    }
  }
};

module.exports = Connection;

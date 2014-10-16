var OA = require("oauth");

var Connection = function(opts){
  this.options = opts;
  this.server = this.options["server"] || "vzaar.com";
};

Connection.prototype = {
  sanitizedUrl: function() {
    return this.server.replace(/^(http\:\/\/|https\:\/\/)/, "");
  }
};

module.exports = Connection;

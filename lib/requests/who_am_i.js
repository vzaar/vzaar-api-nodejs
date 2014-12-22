var Connection = require("../connection");
    

module.exports = (function(){
  var WhoAmI = function(connectionOptions) {   
    this.connectionOptions = connectionOptions;
    this.connectionOptions.path = "/api/test/whoami.json"
  };

  WhoAmI.prototype = {
    execute: function(callback){
      var conn = new Connection(this.connectionOptions, callback);
      conn.get();
    }
  };

  return WhoAmI;
}());


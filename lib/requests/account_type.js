var Connection = require("../connection");
    
module.exports = (function(){
 
  var AccountTypeId = function(connectionOptions, accountTypeId) {   
    this.connectionOptions = connectionOptions;
    this.connectionOptions.path = "/api/accounts/" + accountTypeId + ".json";
  };

  AccountTypeId.prototype = {
    execute: function(callback){
      var conn = new Connection(this.connectionOptions, callback);
      conn.get();
    }
  };

  return AccountTypeId;
}());

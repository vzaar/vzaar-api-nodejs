var Core = require("./core"),
    Connection = require("./connection");

var Request = function(){};
Request.prototype = {
  execute: function(callback){
    var conn = new Connection(this.connectionOptions, callback);
    conn.get();
  }
};


// WhoAamI
var WhoAmI = function(connectionOptions) {   
  this.connectionOptions = connectionOptions;
  this.connectionOptions.path = "/api/test/whoami.json"
};
Core.inherit(WhoAmI, Request, {});


// AccountType
var AccountType = function(connectionOptions, accountTypeId) {   
  this.connectionOptions = connectionOptions;
  this.connectionOptions.path = "/api/accounts/" + accountTypeId + ".json";
};
Core.inherit(AccountType, Request, {});

// User Details

var UserDetails = function(connectionOptions, userLogin) {   
  this.connectionOptions = connectionOptions;
  this.connectionOptions.path = "/api/users/" + userLogin + ".json";
};
Core.inherit(UserDetails, Request, {});


module.exports = {
  WhoAmI: WhoAmI,
  AccountType: AccountType,
  UserDetails: UserDetails
}
  


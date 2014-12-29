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


// Signature

var Signature = function(connectionOptions, params) {
  this.connectionOptions = connectionOptions;
  this.connectionOptions.path = "/api/videos/signature.json";
  this.connectionOptions.params = params;
};

// Video Details

var VideoDetails = function(connectionOptions, videoId, params) {
  this.connectionOptions = connectionOptions;
  this.connectionOptions.path = "/api/videos/" + videoId + ".json";
  this.connectionOptions.params = params;
};

Core.inherit(VideoDetails, Request, {});



// Video List

var VideoList = function(connectionOptions, login, params) {
  this.connectionOptions = connectionOptions;
  this.connectionOptions.path = "/api/" + login + "/videos.json";
  this.connectionOptions.params = params;
};

Core.inherit(VideoList, Request, {});


module.exports = {
  WhoAmI: WhoAmI,
  AccountType: AccountType,
  UserDetails: UserDetails,
  Signature: Signature,
  VideoDetails: VideoDetails,
  VideoList: VideoList
}
  


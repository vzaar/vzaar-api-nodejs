var Core = require("./core"),
    Connection = require("./connection");

var Request = function(){};
Request.prototype = {
  get: function(callback){ this._conn(callback)._call('get'); },
  delete: function(callback){ this._conn(callback)._call('delete'); },
  post: function(callback, body){
    this._conn(callback)._call('post', body);
  },
  
  _conn: function(callback){
    return new Connection(this.connectionOptions, callback);
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

Core.inherit(Signature, Request, {});

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


// Process Video

var ProcessVideo = function(connectionOptions) {
  this.connectionOptions = connectionOptions;
  this.connectionOptions.path = "/api/videos.json";
};

Core.inherit(ProcessVideo, Request, {
  post: function(callback, body){
    var _super = Request.prototype.post;
    _super.call(this, callback, { vzaar_api: { video: body }});
  }
});

// Delete Video

var DeleteVideo = function(connectionOptions, videoId) {
  this.connectionOptions = connectionOptions;
  this.connectionOptions.path = "/api/videos/" + videoId + ".json";
};

Core.inherit(DeleteVideo, Request, {});


// UploadThumbnail

var UploadThumbnail = function(connectionOptions, videoId) {
  this.connectionOptions = connectionOptions;
  this.connectionOptions.path = "/api/videos/" + videoId + ".json";
};

Core.inherit(UploadThumbnail, Request, {});


module.exports = {
  WhoAmI: WhoAmI,
  AccountType: AccountType,
  UserDetails: UserDetails,
  Signature: Signature,
  VideoDetails: VideoDetails,
  VideoList: VideoList,
  ProcessVideo: ProcessVideo,
  DeleteVideo: DeleteVideo,
  UploadThumbnail: UploadThumbnail
}
  


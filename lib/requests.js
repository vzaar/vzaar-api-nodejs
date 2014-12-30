var Core = require("./core"),
    Request = require("./request");


// WhoAamI
var WhoAmI = function(options) {   
  this.options = options;
  this.path = "/api/test/whoami.json"
};
Core.inherit(WhoAmI, Request, {});


// AccountType
var AccountType = function(options, accountTypeId) {
  this.options = options;
  this.path = "/api/accounts/" + accountTypeId + ".json";
};
Core.inherit(AccountType, Request, {});


// User Details
var UserDetails = function(options, userLogin) {
  this.options = options;
  this.path = "/api/users/" + userLogin + ".json";
};
Core.inherit(UserDetails, Request, {});


// Signature

var Signature = function(options, params) {
  this.options = options;
  this.path = "/api/videos/signature.json";
  this.params = params;
};

Core.inherit(Signature, Request, {});


// Video Details

var VideoDetails = function(options, videoId, params) {
  this.options = options;
  this.params = params;
  this.path = "/api/videos/" + videoId + ".json";
};

Core.inherit(VideoDetails, Request, {});


// Video List

var VideoList = function(options, login, params) {
  this.options = options;
  this.path = "/api/" + login + "/videos.json";
  this.params = params;
};

Core.inherit(VideoList, Request, {});


// Process Video

var ProcessVideo = function(options) {
  this.options = options;
  this.path = "/api/videos.json";
};

Core.inherit(ProcessVideo, Request, {
  post: function(callback, body){
    var _super = Request.prototype.post;
    _super.call(this, callback, { vzaar_api: { video: body }});
  }
});


// Delete Video

var DeleteVideo = function(options, videoId) {
  this.options = options;
  this.path = "/api/videos/" + videoId + ".json";
};

Core.inherit(DeleteVideo, Request, {});


// UploadThumbnail

var UploadThumbnail = function(options, videoId) {
  this.options = options;
  this.path = "/api/videos/"+videoId+"/upload_thumb.json";
};

Core.inherit(UploadThumbnail, Request, {
  post: function(callback, body){
    this._conn(callback)._call('multipart/post', body);
  },
});


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
  


var Core = require("./core"),
    Request = require("./request"),

    http = require("http"),
    https = require("https"),
    path = require('path'),
    fs = require('fs');


// WhoAamI
var WhoAmI = function(options) {   
  this.options = options;
  this.path = path.join("api", "test", "whoami") + ".json";
};
Core.inherit(WhoAmI, Request, {});


// AccountType
var AccountType = function(options, accountTypeId) {
  this.options = options;
  this.path = path.join("api", "accounts",  accountTypeId.toString()) + ".json";
};
Core.inherit(AccountType, Request, {});


// User Details
var UserDetails = function(options, login) {
  this.options = options;
  this.path = path.join("api", "users", login) + ".json";
};
Core.inherit(UserDetails, Request, {});


// Signature

var Signature = function(options, params) {
  this.options = options;
  this.path = path.join("api", "videos", "signature") + ".json";
  this.params = params;
};

Core.inherit(Signature, Request, {});


// Video Details

var VideoDetails = function(options, videoId, params) {
  this.options = options;
  this.params = params;
  this.path = path.join("api", "videos", videoId.toString()) + ".json";
};

Core.inherit(VideoDetails, Request, {});


// Video List

var VideoList = function(options, login, params) {
  this.options = options;
  this.path = path.join("api", login, "videos") + ".json";
  this.params = params;
};

Core.inherit(VideoList, Request, {});


// Process Video

var ProcessVideo = function(options) {
  this.options = options;
  this.path = path.join("api", "videos") + ".json";
};

Core.inherit(ProcessVideo, Request, {
  post: function(callback, data){
    var _super = Request.prototype.post;
    _super.call(this, callback, { vzaar_api: { video: data }});
  }
});


// Delete Video

var DeleteVideo = function(options, videoId) {
  this.options = options;
  this.path = path.join("api", "videos", videoId.toString()) + ".json";
};

Core.inherit(DeleteVideo, Request, {});


// UploadThumbnail

var UploadThumbnail = function(options, videoId) {
  this.options = options;
  this.path = path.join("api", "videos", videoId.toString(), "upload_thumb") + ".json";
  this.boundary = Date.now().toString(16);
};

Core.inherit(UploadThumbnail, Request, {
  post: function(callback, data){
    var body = this._buildBody(data.path),

        isHttp = this.options.forceHttp,
        protocol = isHttp ? http : https,
        port = isHttp ? 80 : 443,
        
        options = {
          host: this._hostname(),
          port: port,
          path: "/" + this.path,
          method: 'POST',
          headers: this._headers(body.length)
        };

    req = protocol.request(options);    
    req.write(body);
    req.end();

    req.on('response', function (res) {
      var _data = ""
      res.setEncoding('utf8');
      
      res.on('data', function (chunk) {
        _data += chunk;
      });

      res.on('end', function () {
        callback(res.statusCode, Core.parseJson(_data));
      });
    });
  },

  _buildBody: function(filepath){
    var file = fs.readFileSync(filepath),
        filename = path.basename(filepath),
        imgSuffix = filename.split(".")[1],

        crlf = "\r\n",
        separator = '--' + this.boundary,
        footer = crlf + separator + '--' + crlf + crlf,

        content = separator
        + crlf
        + 'Content-Disposition: form-data; name="vzaar-api[thumbnail]"; filename="'
        + filename
        + '"'
        + crlf

        + 'Content-Type: image/' + imgSuffix
        + crlf
        + crlf;

    return Buffer.concat([ new Buffer(content), file, new Buffer(footer) ]);
  },

  _headers: function(bodyLen){
    var auth = this._oauth().authHeader(this._buildUrl(), this.options.login,
                                        this.options.token, 'POST');
    
    return { 'Authorization': auth,
             'Content-Type': 'multipart/form-data; boundary=' + this.boundary,
             'Host': this._hostname(),
             'Content-Length': bodyLen,
             'Connection': 'Keep-Alive' };
  }
});


// Generate Thumbnail

var GenerateThumbnail = function(options, videoId) {
  this.options = options;
  this.path = path.join("api", "videos", videoId.toString(), "generate_thumb") + ".json";
};

Core.inherit(GenerateThumbnail, Request, {
  post: function(callback, data){
    var _super = Request.prototype.post;
    _super.call(this, callback, { vzaar_api: { video: { thumb_time: data.time }}});
  }
});


// Add Subtitle

var AddSubtitle = function(options) {
  this.options = options;
  this.path = path.join("api", "subtitle", "upload") + ".json";
};

Core.inherit(AddSubtitle, Request, {
  post: function(callback, data){
    var _super = Request.prototype.post;
    _super.call(this, callback, { vzaar_api: { subtitle: data }});
  }
});


// Link Upload

var LinkUpload = function(options) {
  this.options = options;
  this.path = path.join("api", "upload", "link") + ".json";
};

Core.inherit(LinkUpload, Request, {
  post: function(callback, data){
    var _super = Request.prototype.post;
    _super.call(this, callback, { vzaar_api: { link_upload: data}});
  }
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
  UploadThumbnail: UploadThumbnail,
  GenerateThumbnail: GenerateThumbnail,
  AddSubtitle: AddSubtitle,
  LinkUpload: LinkUpload
}
  


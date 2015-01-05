var Requests = require("./requests"),
    Uploader = require("./uploader");

module.exports = (function(){
  var Api = function(opts){
    this.options = opts;
  };

  Api.prototype = {
    whoAmI: function(callback){
      var req = new Requests.WhoAmI(this.options);
      req.get(callback);
    },

    accountType: function(accountTypeId, callback){
      var req = new Requests.AccountType(this.options, accountTypeId);
      req.get(callback);
    },

    userDetails: function(userLogin, callback){
      var req = new Requests.UserDetails(this.options, userLogin);
      req.get(callback);
    },

    signature: function(callback, params){      
      var req = new Requests.Signature(this.options, params);
      req.get(callback);
    },
        
    videoDetails: function(videoId, callback, params){
      var req = new Requests.VideoDetails(this.options, videoId, params);
      req.get(callback);
    },
    
    videoList: function(login, callback, params){
      var req = new Requests.VideoList(this.options, login, params);
      req.get(callback);
    },

    s3Upload: function(path, callback){
      this.signature(function(statusCode, signature){
        if (statusCode === 200) {
          var uploader = new Uploader(path, signature);
          uploader.upload(callback);
        } else {
          callback(statusCode, JSON.parse(signature.data));
        }
      });
    },

    uploadAndProcessVideo: function(path, callback, data){
      var that = this;
      this.s3Upload(path, function(statusCode, _data){
        if (statusCode === 201) {
          data.guid = _data.guid;
          that.processVideo(callback, data);
        } else {
          callback(statusCode, _data);
        }
      });
    },

    processVideo: function(callback, data){
      var req = new Requests.ProcessVideo(this.options);
      req.post(callback, data);
    },

    deleteVideo: function(videoId, callback){
      var req = new Requests.DeleteVideo(this.options, videoId);
      req.delete(callback);
    },

    uploadThumbnail: function(videoId, callback, data){
      var req = new Requests.UploadThumbnail(this.options, videoId);
      req.post(callback, data);
    },

    generateThumbnail: function(videoId, callback, data){
      var req = new Requests.GenerateThumbnail(this.options, videoId);
      req.post(callback, data);
    },
    
    addSubtitle: function(callback, data){
      var req = new Requests.AddSubtitle(this.options);
      req.post(callback, data);
    }
  };

  return Api;
})();

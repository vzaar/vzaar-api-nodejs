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
        var uploader = new Uploader(path, signature);
        uploader.upload(callback);
      });
    },

    processVideo: function(callback, body){
      var req = new Requests.ProcessVideo(this.options);
      req.post(callback, body);
    },

    deleteVideo: function(videoId, callback){
      var req = new Requests.DeleteVideo(this.options, videoId);
      req.delete(callback);
    },
    
    editVideo: function(videoId, opts){},
    addSubtitle: function(videoId, opts){},
    uploadThumbnail: function(videoId, opts){}
  };

  return Api;
})();

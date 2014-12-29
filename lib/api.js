var Requests = require("./requests");

module.exports = (function(){
  var Api = function(opts){
    this.options = opts;
  };

  Api.prototype = {
    whoAmI: function(callback){
      var req = new Requests.WhoAmI(this.options);
      req.execute(callback);
    },

    accountType: function(accountTypeId, callback){
      var req = new Requests.AccountType(this.options, accountTypeId);
      req.execute(callback);
    },

    userDetails: function(userLogin, callback){
      var req = new Requests.UserDetails(this.options, userLogin);
      req.execute(callback);
    },

    signature: function(callback, params){      
      var req = new Requests.Signature(this.options, params);
      req.execute(callback);
    },
        
    videoDetails: function(videoId, callback, params){
      var req = new Requests.VideoDetails(this.options, videoId, params);
      req.execute(callback);
    },
    
    videoList: function(login, callback, params){
      var req = new Requests.VideoList(this.options, login, params);
      req.execute(callback);
    },

    deleteVideo: function(videoId, opts){},
    editVideo: function(videoId, opts){},
    processVideo: function(opts){},
    uploadVideo: function(opts){},
    addSubtitle: function(videoId, opts){},
    uploadThumbnail: function(videoId, opts){}
  };

  return Api;
})();

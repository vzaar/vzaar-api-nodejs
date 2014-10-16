var Connection = require("./connection"),
    Request = require("./request");

module.exports = (function(){
  function getConnection(opts){
    return new Connection(opts);
  };

  var Api = function(opts){
    this.options = opts;
    conn = new Connection(opts);
  };

  Api.prototype = {
    whoami: function(opts){
      var req = new Request.WhoAmI(getConnection(this.options), opts),
          data = req.execute();

      return data.login;
    },

    accountType: function(accountTypeId, opts){},
    userDetails: function(login, opts){},
    videoDetails: function(videoId, opts){},
    videoList: function(login, opts){},
    videos: function(opts){},
    deleteVideo: function(videoId, opts){},
    editVideo: function(videoId, opts){},
    signature: function(opts){},
    processVideo: function(opts){},
    uploadVideo: function(opts){},
    addSubtitle: function(videoId, opts){},
    uploadThumbnail: function(videoId, opts){}
  };

  return Api;
})();

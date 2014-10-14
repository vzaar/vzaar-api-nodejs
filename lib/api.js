var Connection = require("./connection");

var Api = function(opts){
  this.conn = new Connection();
};

Api.prototype = {
  whoami: function(){},
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


module.exports = Api;

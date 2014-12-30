var assert = require("assert"),
    helper = require("./helper");

describe("UploadThumbnail", function(){
  describe("Authorised", function(){
    this.timeout(35000);
    var api = helper.init(),
        videoId = helper.getConf("videoId"),
        path = "./examples/pic.jpg";
    
    it("returns 200", function(done){
      api.uploadThumbnail(videoId, function(statusCode, data){
        
      }, { path: path});
    });
  });
});

var assert = require("assert"),
    helper = require("./helper");


describe("VideoDetails", function(){
  describe("Authorised", function(){
    this.timeout(10000);

    var api = helper.init(),
        videoId = helper.getConf("videoId");
    
    
    it("returns video details", function(done){
      api.videoDetails(videoId, function(statusCode, data){
        assert.equal(data.author_name, helper.getConf("login"));
        done();
      });
    });

    it("returns 200", function(done){
      api.videoDetails(videoId, function(statusCode, data){        
        assert.equal(statusCode, 200);
        done();
      });
    });
  });
});

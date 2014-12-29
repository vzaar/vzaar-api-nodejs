var assert = require("assert"),
    helper = require("./helper"),
    Vzaar = require("../lib/vzaar");


describe("VideoDetails", function(){
  describe("Authorised", function(){
    this.timeout(10000);

    var api = new Vzaar.Api({ login: helper.getConf("login"),
                              token: helper.getConf("token"),
                              hostname: helper.getConf("hostname"),
                              forceHttp: helper.getConf("forceHttp") }),

        videoId = helper.getConf("videoId");
    
    
//    it("returns video details", function(done){
//      api.videoDetails(videoId, function(statusCode, data){
//        assert.equal(data.author_name, helper.getConf("login"));
//        done();
//      });
//    });

    it("returns 200", function(done){
      api.videoDetails(videoId, function(statusCode, data){        
        assert.equal(statusCode, 200);
        done();
      });
    });
  });
});

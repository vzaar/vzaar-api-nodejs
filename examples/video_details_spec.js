var assert = require("assert"),
    helper = require("./helper"),
    Vzaar = require("../lib/vzaar");


describe("VideoDetails", function(){
  describe("Authorised", function(){
    this.timeout(10000);

    var login = helper.getConf("login"),
        token = helper.getConf("token"),
        videoId = helper.getConf("videoId"),
        api = new Vzaar.Api({ login: login, token: token });
    
    
    it("returns video details", function(done){
      api.videoDetails(videoId, function(statusCode, data){
        assert.equal(data.author_name, login);
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

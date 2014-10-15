var assert = require("assert"),
    helper = require("./helper");

describe("ProcessAndDeleteVideo", function(){
  var path = "./examples/video.mp4";
  describe("Authorised", function(){
    this.timeout(35000);
    var api = helper.init();
    
    it("returns 200", function(done){      
      api.uploadAndProcessVideo(path, function(statusCode, data){
        assert.equal(statusCode, 200);
    
        // clean up
        api.deleteVideo(data.id, function(statusCode, _data){
          assert.equal(statusCode, 200);
          done();
        });
      }, { profile: 3, title: "nodejs-test" });
    });
  });

  describe("Unauthorised", function(){
    this.timeout(35000);
    var api = helper.init({token: "invalid"});
    it("returns 401", function(done){
      api.uploadAndProcessVideo(path, function(statusCode, data){
        assert.equal(statusCode, 401);
        assert.equal(data["vzaar-api"]["error"]["type"], "Not Authorized");
        done();
      }, { profile: 3, title: "nodejs-test" });
    });
  });
});

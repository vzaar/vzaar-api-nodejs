var assert = require("assert"),
    helper = require("./helper");

describe("ProcessAndDeleteVideo", function(){
  describe("Authorised", function(){
    this.timeout(35000);
    var api = helper.init(),
        path = "./examples/video.mp4";
       
    it("returns 200", function(done){
      api.uploadAndProcessVideo(path, function(statusCode, data){
        assert.equal(statusCode, 200);

        // clean up
        api.deleteVideo(_data.id, function(statusCode, __data){
          assert.equal(statusCode, 200);
          done();
        });
      }, { profile: 3, title: "nodejs-test" });
    });
  });
});

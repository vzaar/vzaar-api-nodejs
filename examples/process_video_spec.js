var assert = require("assert"),
    helper = require("./helper");

describe("ProcessVideo", function(){
  describe("Authorised", function(){
    this.timeout(30000);
    var api = helper.init(),
        path = "./examples/video.mp4";
       
    it("returns 200", function(done){
      api.s3Upload(path, function(statusCode, data){
        api.processVideo(function(statusCode, _data){
          assert.equal(statusCode, 200);
          done();
        }, { guid: data.guid, profile: 3, title: "nodejs-test" });
      });
    });
  });
});

var assert = require("assert"),
    helper = require("./helper");

describe("EditVideo", function(){
  describe("Authorised", function(){
    this.timeout(35000);
    var api = helper.init(),
        videoId = helper.getConf("videoId");

    it("returns 200", function(done){
      var newTitle = "api-test-node-edit-" + helper.randStr(5);

      api.editVideo(videoId, function(statusCode, data){
        assert.equal(statusCode, 200);

        api.videoDetails(videoId, function(statusCode, data){
          assert.equal(data.title, newTitle);
          done();
        });
      }, { title: newTitle });
    });
  });
});

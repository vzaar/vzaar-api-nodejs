var assert = require("assert"),
    helper = require("./helper");

describe("GenerateThumbnail", function(){
  describe("Authorised", function(){
    this.timeout(30000);
    var api = helper.init(),
        videoId = helper.getConf("videoId");
    
    it("returns 202", function(done){
      api.generateThumbnail(videoId, function(statusCode, data){
        assert.equal(statusCode, 202);
        assert.equal(data["vzaar-api"]["status"], "Accepted");
        done();
      }, { time: 2});
    });
  });
});

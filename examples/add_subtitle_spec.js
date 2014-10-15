var assert = require("assert"),
    helper = require("./helper");

describe("AddSubtitle", function(){
  describe("Authorised", function(){
    this.timeout(30000);
    var api = helper.init(),
        videoId = helper.getConf("videoId");
    
    it("returns 202", function(done){
      api.addSubtitle(function(statusCode, data){
        assert.equal(statusCode, 202);
        assert.equal(data["vzaar-api"]["status"], "Accepted");
        done();
      }, { body: "SRT", video_id: videoId, language: "en"});
    });
  });
});

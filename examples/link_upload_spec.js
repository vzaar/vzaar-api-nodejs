var assert = require("assert"),
    helper = require("./helper");

describe("LinkUpload", function(){
  describe("Authorised", function(){
    this.timeout(35000);
    var api = helper.init();
    
    it("returns 200", function(done){      
      api.linkUpload(function(statusCode, data){
        assert.equal(statusCode, 200);
        // clean up
        api.deleteVideo(data["vzaar-api"].id, function(statusCode, _data){
          assert.equal(statusCode, 200);
          done();
        });
      }, { encoding_params: { size_id: 3, title: "njs-link-upload-test" },
           url: "http://samples.mplayerhq.hu/MPEG-4/turn-on-off.mp4"
         });
    });
  });

  describe("Unauthorised", function(){
    this.timeout(35000);
    var api = helper.init({token: "invalid"});
    
    it("returns 401", function(done){
      api.linkUpload(function(statusCode, data){
        assert.equal(statusCode, 401);
        assert.equal(data["vzaar-api"]["error"]["type"], "Not Authorized");
        done();
      }, { encoding_params: { size_id: 3, title: "njs-link-upload-test" },
           url: "http://samples.mplayerhq.hu/MPEG-4/turn-on-off.mp4"
         });
    });
  });
});

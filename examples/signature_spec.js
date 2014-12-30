var assert = require("assert"),
    helper = require("./helper");


describe("Signature", function(){
  describe("Authorised", function(){
    this.timeout(10000);

    var api = helper.init();    
    
    it("returns signature", function(done){
      api.signature(function(statusCode, data){
        assert.ok(data.hasOwnProperty("AWSAccessKeyId"));
        done();
      });
    });

    it("returns 200", function(done){
      api.signature(function(statusCode, data){        
        assert.equal(statusCode, 200);
        done();
      });
    });
  });
});

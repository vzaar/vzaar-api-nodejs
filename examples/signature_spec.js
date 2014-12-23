var assert = require("assert"),
    helper = require("./helper"),
    Vzaar = require("../lib/vzaar");


describe("Signature", function(){
  describe("Authorised", function(){
    this.timeout(10000);

    var login = helper.getConf("login"),
        token = helper.getConf("token"),
        api = new Vzaar.Api({ login: login, token: token });
    
    
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

var assert = require("assert"),
    helper = require("./helper"),
    Vzaar = require("../lib/vzaar"),
    Core = require("../lib/core");


describe("VideoList", function(){
  describe("Authorised", function(){
    this.timeout(10000);

    var login = helper.getConf("login"),
        token = helper.getConf("token"),
        api = new Vzaar.Api({ login: login, token: token });
    
    
    it("returns videos", function(done){
      api.videoList(login, function(statusCode, data){
        assert.ok(Core.isArray(data), true);
        done();
      });
    });

    it("returns 200", function(done){
      api.videoList(login, function(statusCode, data){        
        assert.equal(statusCode, 200);
        done();
      });
    });
  });
});

var assert = require("assert"),
    helper = require("./helper"),
    Core = require("../lib/core");


describe("VideoList", function(){
  describe("Authorised", function(){
    this.timeout(10000);
    var api = helper.init(),
        login = helper.getConf('login');
    
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

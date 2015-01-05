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
        assert.equal(data.length, 3);
        done();
      }, { count: 3 });
    });

    describe("labels", function(){
      it("returns videos", function(done){
        api.videoList(login, function(statusCode, data){
          assert.equal(data.length, 1);
          done();
        }, { count: 3, labels: "api,api2" });
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

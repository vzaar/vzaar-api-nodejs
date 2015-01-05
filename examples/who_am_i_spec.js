var assert = require("assert"),
    helper = require("./helper");

describe("WhoAmI", function(){
  describe("Authorised", function(){
    this.timeout(10000);
    var api = helper.init();
    
    it("returns user name", function(done){
      api.whoAmI(function(statusCode, data){
        assert.equal(data.vzaar_api.test.login, helper.getConf('login'));
        done();
      });
    });

    it("returns 200", function(done){
      api.whoAmI(function(statusCode, data){        
        assert.equal(statusCode, 200);
        done();
      });
    });
  });

  describe("when host can't be resolved", function(){
    var api = helper.init({hostname: "vzexample.localhost"});
    it("returns error", function(done){
      api.whoAmI(function(statusCode, data){
        assert.equal(statusCode, undefined);
        assert.equal(data, 'Error: getaddrinfo ENOTFOUND');
        done();
      });
    });
  });
});

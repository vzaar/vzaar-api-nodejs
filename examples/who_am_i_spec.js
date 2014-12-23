var assert = require("assert"),
    helper = require("./helper"),
    Vzaar = require("../lib/vzaar");


describe("WhoAmI", function(){
  describe("Authorised", function(){
    this.timeout(10000);

    var login = helper.getConf("login"),
        token = helper.getConf("token"),
        api = new Vzaar.Api({ login: login, token: token });
    
    
    it("returns user name", function(done){
      api.whoAmI(function(statusCode, data){        
        assert.equal(data.vzaar_api.test.login, login);
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
});

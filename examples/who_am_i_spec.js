var assert = require("assert"),
    helper = require("./helper"),
    Vzaar = require("../lib/vzaar");


describe("WhoAmI", function(){
  describe("Authorised", function(){
    this.timeout(10000);

      var login = helper.getConf("login"),
          token = helper.getConf("token");
    
    it("returns user name", function(done){
      var api = new Vzaar.Api({ login: login, token: token });
      
      api.whoAmI(function(statusCode, data){        
        assert.equal(data.vzaar_api.test.login, login);
        done();
      });
    });
  });
});

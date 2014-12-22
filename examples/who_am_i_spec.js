var assert = require("assert"),
    Vzaar = require("../lib/vzaar"),
    apiEnvs = require("../api_envs");


describe("WhoAmI", function(){
  describe("Authorised", function(){
    this.timeout(10000);
    
    it("returns user name", function(done){
      var api = new Vzaar.Api({ login: apiEnvs.qa.login,
                                token: apiEnvs.qa.token });
      
      api.whoAmI(function(statusCode, data){        
        assert.equal(data.vzaar_api.test.login, apiEnvs.qa.login);
        done();
      });
    });
  });
});

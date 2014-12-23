var assert = require("assert"),
    Vzaar = require("../lib/vzaar"),
    apiEnvs = require("../api_envs");


describe("AccountType", function(){
  this.timeout(10000);
  
  it("returns account type", function(done){
    var api = new Vzaar.Api({ login: apiEnvs.qa.login,
                              token: apiEnvs.qa.token }),

        accountId = 34;
    
    api.accountType(accountId, function(statusCode, data){        
      assert.equal(data.account_id, accountId);
      done();
    });
  });
  
});

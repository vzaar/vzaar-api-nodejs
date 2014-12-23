var assert = require("assert"),
    helper = require("./helper"),
    Vzaar = require("../lib/vzaar");


describe("AccountType", function(){
  this.timeout(10000);

  var login = helper.getConf("login"),
      token = helper.getConf("token"),
      accountId = 34;
  
  it("returns account type", function(done){
    var api = new Vzaar.Api({login: login, token: token});
    
    api.accountType(accountId, function(statusCode, data){        
      assert.equal(data.account_id, accountId);
      done();
    });
  });
  
});

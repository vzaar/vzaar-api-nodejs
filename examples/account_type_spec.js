var assert = require("assert"),
    helper = require("./helper");

describe("AccountType", function(){
  this.timeout(10000);

  var api = helper.init(),
      videoId = helper.getConf("videoId"),
      accountId = 34;
  
  it("returns account type", function(done){
    api.accountType(accountId, function(statusCode, data){        
      assert.equal(data.account_id, accountId);
      done();
    });
  });

  it("returns 200", function(done){
    api.accountType(accountId, function(statusCode, data){        
      assert.equal(statusCode, 200);
      done();
    });
  });
  
});

var assert = require("assert"),
    helper = require("./helper");

describe("UserDetails", function(){
  describe("Authorised", function(){
    this.timeout(10000);
    var api = helper.init(),
        login = helper.getConf('login');
    
    it("returns user name", function(done){
      api.userDetails(login, function(statusCode, data){
        assert.equal(data.author_name, login);
        done();
      });
    });

    it("returns 200", function(done){
      api.userDetails(login, function(statusCode, data){
        assert.equal(statusCode, 200);
        done();
      });
    });
      
  });
});

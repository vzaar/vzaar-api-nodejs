var assert = require("assert"),
    helper = require("./helper"),
    Vzaar = require("../lib/vzaar");


describe("s3Upload", function(){
  this.timeout(30000);

  var login = helper.getConf("login"),
      token = helper.getConf("token"),
      path = "./examples/video.mp4",
      api = new Vzaar.Api({ login: login, token: token });
  
  
  it("returns 201", function(done){
    api.s3Upload(path, function(statusCode, data){
      assert.equal(statusCode, 201);
      done();
    });
  });
});

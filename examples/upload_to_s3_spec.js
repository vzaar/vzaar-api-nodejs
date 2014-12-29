var assert = require("assert"),
    helper = require("./helper"),
    Vzaar = require("../lib/vzaar");


describe("UploadToS3", function(){
  this.timeout(10000);

  var login = helper.getConf("login"),
      token = helper.getConf("token"),
      path = "./video.mp4",
      api = new Vzaar.Api({ login: login, token: token });
  
  
  it("returns 201", function(done){
    api.uploadToS3(path, function(statusCode, data){        
      assert.equal(statusCode, 201);
      done();
    });
  });
});

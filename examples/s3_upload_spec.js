var assert = require("assert"),
    helper = require("./helper");

describe("s3Upload", function(){
  this.timeout(30000);
  var api = helper.init(),
      path = "./examples/video.mp4";
  
  it("returns 201", function(done){
    api.s3Upload(path, function(statusCode, data){
      assert.equal(statusCode, 201);
      done();
    });
  });
});

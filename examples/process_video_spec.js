var assert = require("assert"),
    helper = require("./helper"),
    Vzaar = require("../lib/vzaar");


describe("ProcessVideo", function(){
  describe("Authorised", function(){
    this.timeout(10000);

    var login = helper.getConf("login"),
        token = helper.getConf("token"),
        path = "./examples/video.mp4",
        api = new Vzaar.Api({ login: login, token: token, hostname: "app.vzaar.localhost", forceHttp: true });
       

    it("returns 200", function(done){
      api.s3Upload(path, function(statusCode, data){
        api.processVideo(function(statusCode, _data){
          assert.equal(statusCode, 200);
        }, { guid: data.guid, profile: 3, title: "nodejs-test" });
      });
    });
  });
});

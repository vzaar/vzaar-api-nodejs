var assert = require("assert"),
    Request = require("../lib/request");

describe('Connection', function(){
  var req = new Request();
  
  describe('#_hostname', function(){   
    it('removes http:// from the url', function(){
      req.options = { hostname: "http://qavzr.com"}
      assert.equal(req._hostname(), "qavzr.com");
    });

    it('removes https:// from the url', function(){
      req.options = { hostname: "https://qavzr.com"}
      assert.equal(req._hostname(), "qavzr.com");
    });

    it('sets hostname to vzaar.com if hostname is undefined', function(){
      req.options = {};
      assert.equal(req._hostname(), "vzaar.com");
    });
  });

  describe("#_buildUrl", function(){
    beforeEach(function(){
      req.options = { hostname: "qavzr.com" };
      req.path = "/api/endpoint.json";
      req.params = { foo: "bar" };
    });
    
    it("builds url", function(){
      assert.equal(req._buildUrl(), "https://qavzr.com/api/endpoint.json?foo=bar");
    });

    describe("when forceHttp is enabled", function(){
      it("builds url", function(){
        req.options.forceHttp = true;
        assert.equal(req._buildUrl(), "http://qavzr.com/api/endpoint.json?foo=bar");
      });
    });
  });
});

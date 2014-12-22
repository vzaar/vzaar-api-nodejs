var assert = require("assert"),
    Connection = require("../lib/connection");

describe('Connection', function(){
  describe('#sanitizeUrl', function(){
    it('removes protocol from the url', function(){
      var conn = new Connection({ server: "vzaar.com", path: "/api/endpoint" });    
      assert.equal("https://vzaar.com/api/endpoint", conn.buildUrl());
    });
  });
});

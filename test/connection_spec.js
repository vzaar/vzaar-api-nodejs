var assert = require("assert"),
    Connection = require("../lib/connection");

describe('Connection', function(){
  describe('#sanitizeUrl', function(){
    it('removes protocol from the url', function(){
      var conn = new Connection({server: "http://vzaar.com"});
      assert.equal("vzaar.com", conn.sanitizedUrl());
    });
  });
});

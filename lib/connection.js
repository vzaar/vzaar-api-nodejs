var OAuth = require("oauth").OAuth,
    url = require("url"),
    http = require("http"),
    https = require("https"),
    path = require('path'),
    fs = require('fs');

var Connection = function(options, callback){
  this.options = options;

  this.login = options.login;
  this.token = options.token;
  
  this._callback = callback;
  this.oauth = new OAuth('','', '', '', '1.0A', null, 'HMAC-SHA1');
};

Connection.prototype = {
  _call: function(name, opts){
    switch(name) {
    case "post":
      this.oauth.post(this.buildUrl(),
                      this.login,
                      this.token,
                      JSON.stringify(opts),
                      "application/json",
                      this.callback());
      break;

    case "multipart/post":
      this._oauthMultipart(opts);
      break;
    default:
      this.oauth[name](this.buildUrl(),
                       this.login, this.token, this.callback());
    }
  },

  _oauthMultipart: function(data){
    var data = fs.readFileSync(data.path),
        filename = path.basename(data.path),
        callback = this.callback;

    var crlf = "\r\n";
    var boundary = Date.now().toString(16);

    var separator = '--' + boundary;
    var footer = crlf + separator + '--' + crlf + crlf;
    var contents = separator + crlf
        + 'Content-Disposition: form-data; name="vzaar-api[thumbnail]"; filename="' + filename + '"'
        + crlf
        + 'Content-Type: image/jpeg'
        + crlf
        + crlf;

    var multipartBody = Buffer.concat([
      new Buffer(contents),
      data,
      new Buffer(footer)]);

    var authorization = this.oauth.authHeader(
      this.buildUrl(),
      this.login, this.token, 'POST');

    var headers = {
      'Authorization': authorization,
      'Content-Type': 'multipart/form-data; boundary=' + boundary,
      'Host': this._hostname(),
      'Content-Length': multipartBody.length,
      'Connection': 'Keep-Alive'
    };

    var options = {
      host: this._hostname(),
      port: 80,
      path: this.options.path,
      method: 'POST',
      headers: headers
    };

    var request = http.request(options);
    request.write(multipartBody);

    request.end();

    request.on('error', function (err) {
      console.log('Error: Something is wrong.\n'+JSON.stringify(err)+'\n');
    });

    request.on('response', function (response) {            
      response.setEncoding('utf8');            
      response.on('data', function (chunk) {
        callback(response.statusCode, chunk);
        console.log(chunk.toString());
      });
      response.on('end', function (d) {
        callback(response.statusCode, d);
        console.log(response.statusCode +'\n');
      });
    });
  },

  buildUrl: function() {
    var protocol = this.options.forceHttp ? "http" : "https";    
    return url.format({ protocol: protocol,
                        hostname: this._hostname(),
                        pathname: this.options.path,
                        query: this.options.params });
  },

  _hostname: function(){
    var hostname = this.options.hostname || "vzaar.com";
    return hostname.replace(/^(http\:\/\/|https\:\/\/)/, "");
  },


  callback: function() {
    var _callback = this._callback;
    return function(err, data, res) {
      if (err) {
        _callback(res.statusCode, err);
      } else {
        _callback(res.statusCode, JSON.parse(data));
      }
    }
  }
};

module.exports = Connection;

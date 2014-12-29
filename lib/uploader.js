var FormData = require('form-data'),
    fs = require('fs');

var Uploader = function(path, signature){
  this.path = path;
  this.signature = signature;
  this.url = "https://" + signature.bucket + ".s3.amazonaws.com/";
};

Uploader.prototype = {
  upload: function(callback) {
    var form = new FormData();
    form.append('acl', this.signature.acl);
    form.append('bucket', this.signature.bucket);
    form.append('success_action_status', 201);
    form.append('policy', this.signature.policy);
    form.append('AWSAccessKeyId', this.signature.AWSAccessKeyId);
    form.append('signature', this.signature.signature);
    form.append('key', this.signature.key);
    form.append('file', fs.createReadStream(this.path));
        
    form.submit(this.url, function(err, res){
      if (err) {
        callback(res.statusCode, err);
      } else {
        callback(res.statusCode, res);
      }
    });
  }
};

module.exports = Uploader;

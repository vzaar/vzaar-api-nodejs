var FormData = require('form-data'),
    fs = require('fs');

var Uploader = function(path, signature){
  this.path = path;
  this.signature = signature;
  this.url = "https://" + signature.bucket + ".s3.amazonaws.com/";
};

Uploader.prototype = {
  upload: function(callback) {
    var form = new FormData(),
        signature = this.signature;
    
    form.append('acl', signature.acl);
    form.append('bucket', signature.bucket);
    form.append('success_action_status', 201);
    form.append('policy', signature.policy);
    form.append('AWSAccessKeyId', signature.AWSAccessKeyId);
    form.append('signature', signature.signature);
    form.append('key', signature.key);
    form.append('file', fs.createReadStream(this.path));

    form.submit(this.url, function(err, res){
      if (err) {
        callback(res.statusCode, err);
      } else {
        if (res.statusCode === 201) {
          callback(res.statusCode, { guid: signature.guid });
        } else {
          res.on("data", function(data){
            callback(res.statusCode, data.toString());
          });
        }
      }
    });
  }
};

module.exports = Uploader;

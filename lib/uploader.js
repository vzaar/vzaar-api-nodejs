var request = require('request'),
    fs = require('fs');

var Uploader = function(path, signature){
  this.path = path;
  this.signature = signature;
  this.url = "https://" + signature.bucket + ".s3.amazonaws.com/";
};

Upload.prototype = {
  upload: function(callback) {
    var data = {
      acl: this.signature.acl,
      bucket: this.signature.bucket,
      success_action_status: 201,
      policy: this.signature.policy,
      AWSAccessKeyId: this.signature.access_key_id,
      signature: this.signature.signature,
      key: this.signature.key,
      file: fs.createReadStream(this.path),
    };
    debugger;
    request.post({url: this.url, formData: data}, function(err, res, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Upload successful!  Server responded with:', body);
    });
  }
};

module.exports = Uploader;

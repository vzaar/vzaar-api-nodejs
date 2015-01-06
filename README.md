A node.js client for the vzaar API.

---

>vzaar is the go to video hosting platform for business. Affordable, customizable and secure. Leverage the power of online video and enable commerce with vzaar. For more details and signup please visit [http://vzaar.com](http://vzaar.com)

----

### Installation

Add this line to your application's Gemfile:

    npm install 'vzaar'


### Usage

```javascript

var Vzaar = require("vzaar");
var api = new Vzaar.Api({token: "API token", login: "vzaar login"});
```

If your login and API token are correct, you should be able to fetch your login by calling:
```javascript
api.whoAmI(function(statusCode, data) {
  console.log(data.vzaar_api.test.login);
});

```

### Endpoints:

Note: api#videoDetails and api#videoList don't require authentication when API public feed option is enabled for given account.
api#userDetails and api#accountType are public.

##### Fetching account's type details:
```javascript
api.accountType(accountTypeId, callback);
```

##### Fetching user's details:
```javascript
api.userDetails(username, callback);
```

##### Getting details from video:
```javascript
api.videoDetails(videoId, callback, params);
```

##### Fetching videos:
```javascript
api.videoList(login, callback, params);
```

Example:

```javascript
api.videoList("username", function(statusCode, data) {
  // callback body
}, { count:, 5, labels: "foo, bar" });
```

##### Deleting video from vzaar:
```javascript
api.deleteVideo(videoId, callback);
```

##### Updating existing video:

Not supported yet

##### Uploading new video to s3 (video object will not be created on vzaar):
```javascript
api.s3Upload(pathToFile, callback);
```

##### Uploading new thumbnail for video:
```javascript
api.uploadThumbnail(videoId, callback, data);
```

Example:

```javascript
api.uploadThumbnail(12345, function(statusCode, data) {
  // callback body
}, { path:, "./path/to/my/video.mp4" });
```

##### Generating new thumbnail based on given time value:
```javascript
api.generateThumbnail(videoId, callback, data);
```

Example:

```javascript
api.generateThumbnail(function(statusCode, data) {
  // callback body
}, { time:, 2 });
```

##### Adding subtitle to the video (authentication required):
```javascript
api.addSubtitle(callback, data);
```

Example:

```javascript
api.addSubtitle(function(statusCode, data) {
  // callback body
}, { body: "1\n00:00:17,440 --> 00:01:20,375\n ......", language: "en" });
```


##### Getting guid and aws signature:
```ruby
api.signature(callback, params);
```


### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

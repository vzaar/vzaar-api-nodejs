A node.js client for the vzaar API.

---

>vzaar is the go to video hosting platform for business. Affordable, customizable and secure. Leverage the power of online video and enable commerce with vzaar. For more details and signup please visit [http://vzaar.com](http://vzaar.com)

----

### Installation

Add this line to your application's Gemfile:

    npm install 'vzaar'


### Usage

```javascript

var api = new Vzaar.Api({token: "API token", login: "vzaar login"});
```

If your login and API token are correct, you should be able to fetch your login by calling:
```javascript
api.whoAmI(function(statusCode, data) {
  console.log(data.vzaar_api.test.login);
});

```

### Endpoints:

Fetching account's type details:
```javascript
api.account_type(account_type_id, options)
```

Fetching user's details:
```javascript
api.user_details("user login", options)
```

Getting details from public video:
```javascript
api.video_details(video_id, options)
```

Getting details from private video (authentication required):
```javascript
api.video_details(video_id, authenticated: true)
```

Fetching videos for a given user:
```javascript
api.video_details("user login", options)
```

Fetching videos for authenticated user (authentication required):
```javascript
api.videos
```

Removing video from vzaar: (authentication required)
```javascript
api.delete_video(video_id)
```

Updating existing video (authentication required):
```javascript
api.edit_video(video_id, options)

# options are: title, description, private and seo_url
```

Uploading new video to vzaar (authentication required):
```javascript
api.upload_video(options)

# options are: path, url, title, description, profile, transcoding, replace_id,
# width and bitrate
#
# api.upload_video(path: "./path/to/video.mp4", title: "my video")
#
# For link upload use url param:
# api.upload_video(url: "http://example.com/video.mp4", title: "my video")
```

Uploading new thumbnail for video (authentication required):
```javascript
api.upload_thumbnail(video_id, options)

# api.upload_thumbnail(123456, path: "/path/to/image.jpg")
```

Generating new thumbnail based on given time value (authentication required):
```javascript
api.generate_thumbnail(video_id, options)

# api.generate_thumbnail(123456, time: 3)
```

Adding subtitle to the video (authentication required):
```javascript
api.add_subtitle(video_id, options)

# api.add_subtitle(123456, body: "1\n00:00:17,440 --> 00:01:20,375\n ......", language: "en")
```

Getting guid and aws signature (authentication required):
```ruby
api.signature
```


### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

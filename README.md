# Example BoxCast Video Portal (written in vue.js)

> Example video portal site for your BoxCast account written in vue.js

## Getting Started

* Make sure you open `index.html` and change the configuration to point to your BoxCast account:
  ```
    <script src="https://js.boxcast.com/v3.min.js"></script>
    <script>
    var BOXCAST_PORTAL = {
      accountId: '<-- your account ID here -->',
      channelId: '<-- your root channel ID here -->',
    };
    </script>
    ```
* See Customizing below for running locally, then build for deployment

## Features

* Dynamically queries your BoxCast account to list all your channels in the sidebar
* Lists and paginates through all videos in a channel
* Broadcast details page with related videos widget
* Integrates with the standard boxcast.js embed code, getting all its features for free (ticketing, geoblocking, etc)

## Customizing

You can make this project your own - it's meant to be inspiration for your own online video experience! Fork it, check it out, and start hacking away.
``` bash
# set up project
git clone https://github.com/boxcast/example_video_portal_vuejs.git
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

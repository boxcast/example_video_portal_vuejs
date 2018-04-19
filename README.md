# Example BoxCast Video Portal (written in vue.js)

> Example video portal site for your BoxCast account written in vue.js

## Demo

[View Demo Portal](https://boxcast.github.io/example_video_portal_vuejs/)

## Getting Started

* Make sure your have a BoxCast account in good standing. <a href="https://www.boxcast.com">Contact sales if you need to get started streaming</a>.
* Make a copy of `src/config.example.js` as `src/config.js` and change the configuration to point to your BoxCast account:
  ```
  export default {
    accountId: 'abcd1234567890',  // contact BoxCast support if you need help finding your IDs
    channelId: 'efgh0987654321'
  }
  ```
* See Customizing below for running locally, then build for deployment

## Features

* Dynamically queries your BoxCast account to list all your channels in the sidebar
* Lists and paginates through all videos in a channel
* Broadcast details page with related videos widget
* Integrates with the standard boxcast.js embed code, getting all its features for free (ticketing, geoblocking, etc)

![live and upcoming broadcast listing](https://github.com/boxcast/example_video_portal_vuejs/blob/master/screenshots/live_and_upcoming.png?raw=true)

![sample broadcast details page with related videos and collapsable channel browser](https://github.com/boxcast/example_video_portal_vuejs/blob/master/screenshots/broadcast_page.png?raw=true)

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

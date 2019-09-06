<template>
  <div id="app">
    <div class="eyebrow" style="margin-top:-15px">
      Ohio High School Athletic Association
    </div>

    <div class="logobar">
      <div class="titlebar">
        <div class="row">
          <div class="col-12 col-sm-6 text-left">
            <div style="padding-left: 120px">Welcome to The OHSAA Network</div>
          </div>
          <div class="d-none d-sm-block col-6 text-right">
            <div style="padding-right: 15px">
              <a href="https://www.ohsaa.org" target="_top" style="color:#00853e">Return to OHSAA.org</a>
            </div>
          </div>
        </div>
      </div>
      <a href="#/" class="site-logo"></a>
    </div>


    <div class="container-fluid" style="min-height:calc(100vh - 365px)">
      <router-view/>
    </div>

    <div style="background: #fff; opacity:0.8;margin:50px 0 0 0;padding:30px 30px 0 30px;text-align:center;font-size:14px;line-height:14px;">
      <div class="row" style="align-items:center">
        <div class="col-sm-4 text-center text-sm-left" style="margin-bottom:30px">
          <!--OHSAA<br>-->
        </div>
        <div class="col-sm-4" style="margin-bottom:30px">
          Powered by &nbsp;
          <a href="https://www.boxcast.com" target="_blank">
            <img alt="BoxCast" src="https://cdn2.hubspot.net/hub/484866/file-2483746126-png/Logos/NewBoxCastLogo.png?t=1473431021465" style="height:14px;margin-top:-4px;">
          </a>
        </div>
        <div class="col-sm-4 text-center text-sm-right" style="margin-bottom:30px">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from '@/config'
export default {
  name: 'app',
  data () {
    return {
      channels: Config.staticChannels
    }
  },
  mounted () {

  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}
.ellipse, .jumbotron h1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fixed-16-9 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  background: black;
}
.fixed-16-9 > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (max-width: 767px) {
  .col-sm-0 {
    display: none;
  }
}

#boxcast-container .boxcast-well {
  /* reset */
  border: none;
  box-shadow: none;
  text-align: left;
  padding: 0;
  margin: 0;

  /* clean */
  margin-top: 15px;
  padding: 15px;
}



/* red: #E21F3C */
/* dark: #000E1B */
/* blue: #0B59A3 */
/* navy: #00853e*/
/* ohsaa green: #00853e*/

body {
  /*background-color: #000E1B;*/
  background-color:#aaa;
  background: url(https://www.mascac.com/images/setup/2018_page_bg.jpg) no-repeat 50% 0,
              url(https://www.mascac.com/images/setup/2018_bg_grey_pattern.png) repeat;
}
.card {
  background-color: #00853e;
  border-color: #00853e;
}
.card-body {
  background-color: #00853e;
  color: #ddd;
}
.channel-nav {
  color: #00853e;
}
.list-group-item {
  background-color: #0a6b37; /*dark green*/
  color: #ddd;
}
.list-group-item-action:focus, .list-group-item-action:hover {
  background-color: #0a6b37; /*dark green*/
  color: #fff;
}
.list-group-item.active {
  border-color: #00853e;
  background-color: #00853e;
  color: #fff;
}
.boxcast-theme-light .boxcast-well {
  /*background-color: #ff671b;
  color: #ddd;*/
}
.boxcast-theme-light .boxcast-ticket-button {
  background: #00853e;
  border-color: #2ea063;
  color: white;
  font-size: 1.2em;
  display: block;
  width: 100%;
  font-weight: bold;
  border-width: 3px;
  padding: 8px;
}


/* from sprite */
.eyebrow {
  background: #00853e;
  color: #fff;
  padding: 10px;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.logobar {
  background: #FFF;
  padding-top: 5px;
  height: 75px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
}
.titlebar {
  background: transparent;
  color: #00853e;
  font-weight: bold;
  padding: 15px;
}
.site-logo {
  position: absolute;
  left: 10px;
  margin-left: 0;
  top: 10px;
  width: 127px;
  height: 100px;
  text-indent: -9999px;
  background: url('http://ohsaa.org/Portals/_default/Skins/OHSAA/img/ohsaa-logo.svg') no-repeat;
  background-size: contain;
}
.mascac-logo {
  display: inline-block;
  height:81px;
  background:url('./assets/mascac_sprite.png') no-repeat -9999px -9999px;

  /* hide the text but leave it for possible seo and screenreaders */
  white-space: nowrap;
  font-size: 0px;
}
.mascac-logo.bw {
  width:72px;
  margin-right:26px;
  background-position:0 -150px
}
.mascac-logo.fitch {
  width:67px;
  margin-right:35px;
  background-position:-100px -150px;
}
.mascac-logo.fram {
  width:61px;
  margin-right:34px;
  background-position:-202px -150px;
}
.mascac-logo.mma {
  width:67px;
  margin-right:299px;
  background-position:-297px -150px;
}
.mascac-logo.mcla {
  width:80px;
  margin-right:22px;
  background-position:-663px -150px;
}
.mascac-logo.sal {
  width:72px;
  margin-right:35px;
  background-position:-765px -150px;
}
.mascac-logo.west {
  width:63px;
  margin-right:21px;
  background-position:-872px -150px;
}
.mascac-logo.wor {
  width:81px;
  background-position:-956px -150px;
}
@media (max-width: 1090px) {
  /*
  .logobar {
    zoom: 0.70;
    height: 120px;
  }
  .site-logo {
    top: 55px;
  }
  */
}
</style>

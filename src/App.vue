<template>
  <div id="app">
    <div class="eyebrow" style="margin-top:-15px">
      Massachusetts State Collegiate Athletic Conference
    </div>

    <div class="logobar">
      <div class="site-logo"></div>
      <div class="d-none d-md-block">
        <a href="#/channels/h5caqjlbaznkkeogpkyt" class="mascac-logo bw"></a>
        <a href="#/channels/vllvvr5pg83mggb7kw2v" class="mascac-logo fitch"></a>
        <a href="#/channels/grzadi2oij5godrfty09" class="mascac-logo fram"></a>
        <a href="#/channels/kkpc7wzow70pabbcty66" class="mascac-logo mma"></a>
        <a href="#/channels/y1id4pm3ainxdbkumnrs" class="mascac-logo mcla"></a>
        <a href="#/channels/h311z4nlz9cd2cvqacbd" class="mascac-logo sal"></a>
        <a href="#/channels/y259mshcjqjloiu7brue" class="mascac-logo west"></a>
        <a href="#/channels/mshmvss7pspibfrs06vq" class="mascac-logo wor"></a>
      </div>
    </div>

    <div class="titlebar">
      <div class="container-fluid">
        <div class="row">
          <div class="col-6 text-left">
            Welcome to MASCAC.tv
          </div>
          <div class="col-6 text-right">
            Return to MASCAC.com
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid" style="min-height:calc(100vh - 365px)">
      <router-view/>
    </div>

    <div style="background: #fff; opacity:0.8;margin:50px 0 0 0;padding:30px;text-align:center;font-size:14px;line-height:14px;">
      Powered by &nbsp;
      <a href="https://www.boxcast.com" target="_blank"><img alt="BoxCast" src="https://cdn2.hubspot.net/hub/484866/file-2483746126-png/Logos/NewBoxCastLogo.png?t=1473431021465" style="height:14px;margin-top:-4px;"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
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
/* navy: #043562*/

body {
  background-color: #000E1B;
}
.card {
  background-color: #043562;
  border-color: #043562;
}
.card-body {
  background-color: #043562;
  color: #ddd;
}
.channel-nav {
  color: #ddd;
}
.list-group-item {
  background-color: #E21F3C;
  color: #ddd;
}
.list-group-item-action:focus, .list-group-item-action:hover {
  background-color: #0B59A3;
  color: #fff;
}
.list-group-item.active {
  border-color: #043562;
  background-color: #043562;
  color: #fff;
}
.boxcast-theme-light .boxcast-well {
  background-color: #E21F3C;
  color: #ddd;
}


/* from sprite */
.eyebrow {
  background: #E21F3C;
  color: #fff;
  padding: 10px;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.logobar {
  background: #0B59A3;
  padding-top: 25px;
  height: 120px;
}
.titlebar {
  background: #043562;
  border-bottom: 3px solid #E21F3C;
  color: #fff;
  margin-bottom: 30px;
  font-weight: bold;
  padding: 10px 0;
}
.site-logo {
  position:absolute;
  left:50%;
  margin-left:-115px;
  top:36px;
  width:230px;
  height:138px;
  text-indent:-9999px;
  background:url('./assets/mascac_sprite.png') no-repeat;
}
.mascac-logo {
  display: inline-block;
  height:81px;
  background:url('./assets/mascac_sprite.png') no-repeat -9999px -9999px;
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
  .logobar {
    zoom: 0.70;
    height: 120px;
  }
  .site-logo {
    top: 55px;
  }
}
</style>

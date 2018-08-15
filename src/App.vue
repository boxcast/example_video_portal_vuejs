<template>
  <div id="app">

    <!--b-jumbotron header="MASCAC.tv"
                 lead="">
    </b-jumbotron-->

    <div class="eyebrow" style="margin-top:-15px">
      Massachusetts State Collegiate Athletic Conference
    </div>
    <div class="logobar">
      <div class="site-logo"></div>
      <ol id="members-nav" class="list-inline">
        <li class="nav1 list-inline-item"></li>
        <li class="nav2 list-inline-item"></li>
        <li class="nav3 list-inline-item"></li>
        <li class="nav4 list-inline-item"></li>
        <li class="nav5 list-inline-item"></li>
        <li class="nav6 list-inline-item"></li>
        <li class="nav7 list-inline-item"></li>
        <li class="nav8 list-inline-item"></li>
      </ol>
    </div>
    <div class="titlebar">
      <div class="row">
        <div class="col-6 text-left">
          Welcome to MASCAC.tv
        </div>
        <div class="col-6 text-right">
          Return to MASCAC.com
        </div>
      </div>
    </div>

    <div class="container-fluid">
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
  padding: 10px;
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
[id=members-nav] li {
  height:81px;
  background:url('./assets/mascac_sprite.png') no-repeat -9999px -9999px;
}
[id=members-nav] .nav1{
  width:72px;
  margin-right:26px;
  background-position:0 -150px
}
[id=members-nav] .nav2{
  width:67px;
  margin-right:35px;
  background-position:-100px -150px;
}
[id=members-nav] .nav3{
  width:61px;
  margin-right:34px;
  background-position:-202px -150px;
}
[id=members-nav] .nav4{
  width:67px;
  margin-right:299px;
  background-position:-297px -150px;
}
[id=members-nav] .nav5{
  width:80px;
  margin-right:22px;
  background-position:-663px -150px;
}
[id=members-nav] .nav6{
  width:72px;
  margin-right:35px;
  background-position:-765px -150px;
}
[id=members-nav] .nav7{
  width:63px;
  margin-right:21px;
  background-position:-872px -150px;
}
[id=members-nav] .nav8{
  width:81px;
  background-position:-956px -150px;
}
</style>

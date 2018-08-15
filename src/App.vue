<template>
  <div id="app" class="container-fluid">

    <b-jumbotron header="MASCAC.tv"
                 lead="">
    </b-jumbotron>

    <router-view/>

    <div style="opacity:0.8;margin:50px 0 20px;text-align:center;font-size:14px;line-height:14px;">
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
</style>

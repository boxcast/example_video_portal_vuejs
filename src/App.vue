<template>
  <div id="app" class="container-fluid">

    <b-jumbotron header="MyOrganization.tv" lead="Your home for watching live and on-demand broadcasts." >
    </b-jumbotron>

    <router-view/>
  </div>
</template>

<script>
import BoxCastAPI from '@/services/BoxCastAPI'
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
  margin-top: 60px;
}
</style>

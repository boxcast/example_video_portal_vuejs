<template>
  <div class="channel-nav">
    <div class="d-none d-sm-block">
      <b-list-group>
        <b-list-group-item href="#/"
                          :active="$route.query.channel_id == 'live_recent' || $route.name == 'LiveAndRecentListView'">Live and Recent Broadcasts</b-list-group-item>
        <b-list-group-item href="#/upcoming"
                          :active="$route.query.channel_id == 'upcoming' || $route.name == 'UpcomingListView'">Upcoming Broadcasts</b-list-group-item>
        <!--b-list-group-item href="#/highlights"
                          :active="$route.name == 'HighlightView' || $route.name == 'HighlightsListView'">Highlights</b-list-group-item-->
        <b-list-group-item href="#/search"
                          :active="$route.name == 'SearchView'">Search</b-list-group-item>
      </b-list-group>

      <h4>Schools</h4>
      <b-list-group>
        <b-list-group-item disabled
                          v-if="loading">Loading Channels...</b-list-group-item>
        <b-list-group-item v-for="c in channels"
                          :key="c.id"
                          :active="$route.query.channel_id == c.id || $route.params.id == c.id"
                          :href="'#/channels/'+c.id">{{c.name}}</b-list-group-item>
      </b-list-group>

      <h4>MASCAC.tv Apps</h4>
      <em>Coming Soon!</em>
      <div class="row">
        <div class="col-7">
          <a href="javascript://" target="_blank" title="Watch MASCAC.tv on Roku">
            <img style="max-width:100%;width:140px" class="img" src="../assets/roku_logo.png">
          </a>
        </div>
        <div class="col-5">
          <a href="javascript://" target="_blank" title="Watch MASCAC.tv on AppleTV">
            <img style="max-width:100%;width:90px;" class="img" src="../assets/appletv_logo.png">
          </a>
        </div>
      </div>
    </div>
    <div class="d-block d-sm-none mb-5">
      <div class="btn-group" style="width:100%">
        <button style="width:100%" id="dLabel" @click="toggleDropdown" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Browse Channels
        </button>
        <div class="dropdown-menu" aria-labelledby="dLabel" style="width:100%" v-bind:style="{display:menuOpen?'block':'none'}">
          <a class="dropdown-item" href="#/" @click="toggleDropdown" v-bind:class="{active:$route.name == 'LiveAndRecentListView'}">Live and Recent Broadcasts</a>
          <a class="dropdown-item" href="#/upcoming" @click="toggleDropdown"
                                   v-bind:class="{active:$route.name == 'UpcomingListView'}">Upcoming Broadcasts</a>
          <!--a class="dropdown-item" href="#/highlights" @click="toggleDropdown"
                                   v-bind:class="{active:$route.name == 'HighlightsListView'}">Highlights</a-->
          <a class="dropdown-item" href="#/search" @click="toggleDropdown"
                                   v-bind:class="{active:$route.name == 'SearchView'}">Search</a>

          <div class="dropdown-divider"></div>

          <h6 class="dropdown-header">Schools</h6>
          <a class="dropdown-item" disabled v-if="loading">Loading Channels...</a>
          <a class="dropdown-item" v-for="c in channels"
                  :key="c.id"
                  @click="toggleDropdown" v-bind:class="{active:$route.params.id == c.id}"
                  :href="'#/channels/'+c.id">{{c.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import BoxCastAPI from '@/services/BoxCastAPI'
import Config from '@/config'
export default {
  name: 'ChannelNav',
  data () {
    return {
      loading: false,
      channels: [],
      menuOpen: false
    }
  },
  mounted () {
    this.getChannels()
  },
  methods: {
    toggleDropdown () {
      this.menuOpen = !this.menuOpen
    },
    getChannels () {
      this.channels = Config.staticChannels
      /*
      this.loading = true
      BoxCastAPI.getChannels().then((channels) => {
        this.channels = channels
        this.loading = false
      }).catch((e) => {
        console.error(e)
      })
      */
    }
  }
}
</script>

<style>
.channel-nav h4 {
  text-align: left;
  margin-top: 30px;
  font-size: 12pt;
  text-transform: uppercase;
  opacity: 0.6;
}
.list-group-item {
  text-align: left;
  padding: 10px;
  font-size: 10pt;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
}
</style>

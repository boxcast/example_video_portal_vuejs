<template>
  <div class="channel-nav">
    <b-list-group>
      <b-list-group-item href="#/"
                        :active="$route.query.channel_id == 'live_recent' || $route.name == 'LiveAndRecentListView'">Live and Recent Broadcasts</b-list-group-item>
      <b-list-group-item href="#/upcoming"
                        :active="$route.query.channel_id == 'upcoming' || $route.name == 'UpcomingListView'">Upcoming Broadcasts</b-list-group-item>
      <b-list-group-item href="#/highlights"
                        :active="$route.name == 'HighlightView' || $route.name == 'HighlightsListView'">Highlights</b-list-group-item>
      <b-list-group-item href="#/search"
                        :active="$route.name == 'SearchView'">Search</b-list-group-item>
    </b-list-group>

    <h4>Athletics</h4>
    <b-list-group>
      <b-list-group-item disabled
                         v-if="loading">Loading Channels...</b-list-group-item>
      <b-list-group-item v-for="c in channels"
                         :key="c.id"
                         v-if="c.name.indexOf('Athletics') >= 0"
                         :active="$route.query.channel_id == c.id || $route.params.id == c.id"
                         :href="'#/channels/'+c.id">{{c.name.replace('Athletics: ', '')}}</b-list-group-item>
    </b-list-group>

    <h4>Other Channels</h4>
    <b-list-group>
      <b-list-group-item disabled
                        v-if="loading">Loading Channels...</b-list-group-item>
      <b-list-group-item v-for="c in channels"
                         :key="c.id"
                         v-if="c.name.indexOf('Athletics') < 0"
                         :active="$route.query.channel_id == c.id || $route.params.id == c.id"
                         :href="'#/channels/'+c.id">{{c.name}}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import BoxCastAPI from '@/services/BoxCastAPI'
export default {
  name: 'ChannelNav',
  data () {
    return {
      loading: false,
      channels: []
    }
  },
  mounted () {
    this.getChannels()
  },
  methods: {
    getChannels () {
      this.loading = true
      BoxCastAPI.getChannels().then((channels) => {
        this.channels = channels
        this.loading = false
      }).catch((e) => {
        console.error(e)
      })
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

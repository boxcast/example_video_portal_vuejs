<template>
  <b-list-group>
    <b-list-group-item href="#/"
                       :active="$route.query.channel_id == 'live_recent' || $route.name == 'LiveAndRecentListView'">Live and Recent Broadcasts</b-list-group-item>
    <b-list-group-item href="#/upcoming"
                       :active="$route.query.channel_id == 'upcoming' || $route.name == 'UpcomingListView'">Upcoming Broadcasts</b-list-group-item>
    <b-list-group-item href="#/highlights"
                       :active="$route.name == 'HighlightView' || $route.name == 'HighlightsListView'">Highlights</b-list-group-item>
    <b-list-group-item disabled
                       v-if="loading">Loading Channels...</b-list-group-item>
    <b-list-group-item v-for="c in channels"
                       :key="c.id"
                       :active="$route.query.channel_id == c.id || $route.params.id == c.id"
                       :href="'#/channels/'+c.id">{{c.name}}</b-list-group-item>
  </b-list-group>
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

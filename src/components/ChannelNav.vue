<template>
  <b-list-group>
    <b-list-group-item href="#/"
                       active
                       v-if="$route.query.channel_id == 'live_recent' || $route.name == 'LiveAndRecentListView'">Live and Recent Broadcasts</b-list-group-item>
    <b-list-group-item href="#/"
                       v-if="$route.query.channel_id != 'live_recent' && $route.name != 'LiveAndRecentListView'">Live and Recent Broadcasts</b-list-group-item>

    <b-list-group-item href="#/upcoming"
                       active
                       v-if="$route.query.channel_id == 'upcoming' || $route.name == 'UpcomingListView'">Upcoming Broadcasts</b-list-group-item>
    <b-list-group-item href="#/upcoming"
                       v-if="$route.query.channel_id != 'upcoming' && $route.name != 'UpcomingListView'">Upcoming Broadcasts</b-list-group-item>

    <b-list-group-item disabled
                       v-if="loading">Loading Channels...</b-list-group-item>

    <div v-for="c in channels" :key="c.id">
      <b-list-group-item :href="'#/channels/'+c.id"
                         active
                         v-if="$route.query.channel_id == c.id || $route.params.id == c.id">{{c.name}}</b-list-group-item>
      <b-list-group-item :href="'#/channels/'+c.id"
                         v-if="$route.query.channel_id != c.id && $route.params.id != c.id">{{c.name}}</b-list-group-item>
    </div>
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

<style scoped>
</style>

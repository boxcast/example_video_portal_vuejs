<template>
  <b-list-group>
    <b-list-group-item href="#/"
                       active
                       v-if="$route.name == 'LiveAndRecentListView'">Live and Recent Broadcasts</b-list-group-item>
    <b-list-group-item href="#/"
                       v-if="$route.name != 'LiveAndRecentListView'">Live and Recent Broadcasts</b-list-group-item>

    <b-list-group-item href="#/upcoming"
                       active
                       v-if="$route.name == 'UpcomingListView'">Upcoming Broadcasts</b-list-group-item>
    <b-list-group-item href="#/upcoming"
                       v-if="$route.name != 'UpcomingListView'">Upcoming Broadcasts</b-list-group-item>


    <div v-for="c in channels" :key="c.id">
      <b-list-group-item :href="'#/channels/'+c.id"
                         active
                         v-if="$route.name == 'ChannelListView' && $route.params.id == c.id">{{c.name}}</b-list-group-item>
      <b-list-group-item :href="'#/channels/'+c.id"
                         v-if="$route.name != 'ChannelListView' || $route.params.id != c.id">{{c.name}}</b-list-group-item>
    </div>
  </b-list-group>
</template>

<script>
export default {
  name: 'ChannelNav',
  data () {
    return {
      accountId: 'DEMODEMO', // TODO: configure this
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
      // eslint-disable-next-line
      boxcast.utils.fetch(
        `https://api.boxcast.com/accounts/${this.accountId}/channels`
      ).then(
        (r) => r.json()
      ).then((channels) => {
        console.log('Loaded channels', channels)
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

<template>
  <div class="row">
    <div class="col-sm-4 col-md-3 col-lg-2">
      <h2>Channels</h2>
      <b-list-group>
        <b-list-group-item href="#/" active>Live and Recent Broadcasts</b-list-group-item>
        <b-list-group-item href="#/upcoming">Upcoming Broadcasts</b-list-group-item>
        <b-list-group-item :href="'#/channels/'+c.id"
                           :key="c.id"
                           v-for="c in channels">
          {{c.name}}
        </b-list-group-item>
      </b-list-group>
    </div>
    <div class="col-sm-8 col-md-9 col-lg-10">
      <h2>Selected Channel</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChannelListView',
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

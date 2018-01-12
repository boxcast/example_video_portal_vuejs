<template>
  <div class="row">
    <div class="col-sm-4 col-md-3 col-lg-2">
      <!-- Channels -->
      <ChannelNav />
    </div>
    <div class="col-sm-8 col-md-9 col-lg-10">
      <!-- Selected Channel -->

      <b-alert v-if="loading" variant="info" show>Loading Broadcasts...</b-alert>
      <b-alert v-if="!loading && broadcasts.length == 0" variant="info" show>
        There are no broadcasts in the selected channel.
      </b-alert>

      <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-3"
              v-for="b in broadcasts"
              :key="b.id">
          <BroadcastCard :broadcast="b" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ChannelListView',
  data () {
    return {
      accountId: 'DEMODEMO', // TODO: configure this
      accountChannelId: '0xQfGiFHjz3YBfO3o1jd', // TODO: configure this
      loading: false,
      broadcasts: []
    }
  },
  mounted () {
    this.getBroadcasts()
  },
  watch: {
    '$route' (to, from) {
      this.getBroadcasts()
    }
  },
  methods: {
    getBroadcasts () {
      console.log('Route params', this.$route.params)

      this.broadcasts = []

      let channelId = this.accountChannelId
      let s = '-starts_at'
      let q = 'timeframe:relevant'
      let l = 20

      switch (this.$route.name) {
        case 'LiveAndRecentListView':
          q = 'timeframe:current timeframe:past'
          break
        case 'UpcomingListView':
          q = 'timeframe:current timeframe:future'
          s = 'starts_at'
          break
        case 'ChannelListView':
          channelId = this.$route.params.id
          break
      }

      if (!channelId) {
        console.warn('No channel ID provided for route')
        return
      }

      this.loading = true

      // eslint-disable-next-line
      boxcast.getChannelBroadcasts(
        channelId, {q, s, l}
      ).then((broadcasts) => {
        console.log('Loaded channel broadcasts', broadcasts)
        this.broadcasts = broadcasts
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

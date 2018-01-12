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
          <BroadcastCard :broadcast="b" :channelId="channelIdForBroadcastLink" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import BoxCastAPI from '@/services/BoxCastAPI'
export default {
  name: 'ChannelListView',
  data () {
    return {
      accountId: 'DEMODEMO', // TODO: configure this
      accountChannelId: '0xQfGiFHjz3YBfO3o1jd', // TODO: configure this
      loading: false,
      broadcasts: [],
      channelId: null,
      channelIdForBroadcastLink: null
    }
  },
  mounted () {
    this.initChannelId()
    this.getBroadcasts()
  },
  watch: {
    '$route' (to, from) {
      this.initChannelId()
      this.getBroadcasts()
    }
  },
  methods: {
    initChannelId () {
      if (this.$route && this.$route.name == 'ChannelListView') {
        this.channelId = this.$route.params.id
      } else {
        this.channelId = this.accountChannelId
      }

      // Handle special case linking to broadcast details
      this.channelIdForBroadcastLink = this.channelId
      switch (this.$route && this.$route.name) {
        case 'LiveAndRecentListView':
          this.channelIdForBroadcastLink = 'live_recent'
        case 'UpcomingListView':
          this.channelIdForBroadcastLink = 'upcoming'
      }
    },
    getBroadcasts () {
      console.log('Route params', this.$route.params)
      if (!this.channelId) {
        console.warn('No channel ID provided for route')
        return
      }

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
      }

      this.broadcasts = []
      this.loading = true

      BoxCastAPI.getChannelBroadcasts(
        this.channelId, {q, s, l}
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

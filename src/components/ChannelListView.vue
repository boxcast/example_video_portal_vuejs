<template>
  <div class="row">
    <div class="col-sm-4 col-md-3 col-lg-2">
      <ChannelNav />
    </div>
    <div class="col-sm-8 col-md-9 col-lg-10">
      <b-alert v-if="loading && broadcasts.length == 0" variant="info" show>Loading Broadcasts...</b-alert>
      <b-alert v-if="!loading && broadcasts.length == 0" variant="info" show>
        There are no broadcasts in the selected channel.
      </b-alert>

      <div v-if="!listView">
        <transition-group name="list" tag="div" class="row">
          <div v-for="b in broadcasts" :key="b.id" class="col-sm-6 col-md-4 col-lg-3">
            <BroadcastCard :broadcast="b" :channelId="channelIdForBroadcastLink" />
          </div>
        </transition-group>
      </div>

      <div v-if="listView">
        <BroadcastRow v-for="b in broadcasts"
                      :key="b.id"
                      :broadcast="b"
                      :channelId="channelIdForBroadcastLink"></BroadcastRow>
      </div>

      <div class="row" v-if="pagination.next" style="margin-bottom:15px">
        <div class="col-sm-12">
          <button class="btn btn-lg btn-secondary btn-block"
                  @click="getBroadcasts(false, {p: pagination.next})"
                  v-bind:disabled="loading">
            <span v-if="loading">Loading...</span>
            <span v-if="!loading">Load More</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BoxCastAPI from '@/services/BoxCastAPI'
import Config from '@/config'
export default {
  name: 'ChannelListView',
  data () {
    return {
      accountChannelId: Config.channelId,
      listView: !!Config.useListView,
      loading: false,
      broadcasts: [],
      pagination: {},
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
      window.scrollTo(0, 0)
    }
  },
  methods: {
    bgStyle (b) {
      return {
        'background-image': `url("${b.preview}")`,
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-position': '50% 50%'
      }
    },
    initChannelId () {
      if (this.$route && this.$route.name === 'ChannelListView' && this.$route.params) {
        this.channelId = this.$route.params.id
      } else {
        this.channelId = this.accountChannelId
      }

      // Handle special case linking to broadcast details
      this.channelIdForBroadcastLink = this.channelId
      switch (this.$route && this.$route.name) {
        case 'LiveAndRecentListView':
          this.channelIdForBroadcastLink = 'live_recent'
          break
        case 'UpcomingListView':
          this.channelIdForBroadcastLink = 'upcoming'
          break
      }
    },
    getBroadcasts (reset = true, args = {}) {
      if (!this.channelId) {
        console.warn('No channel ID provided for route')
        return
      }

      let doMulti = false
      let s = '-starts_at'
      let q = 'timeframe:relevant'
      let l = 20
      switch (this.$route.name) {
        case 'LiveAndRecentListView':
          // Include anything happening in next 24hr in the default view
          var date = new Date()
          var start = date.toISOString().slice(0, 10)
          date.setDate(date.getDate() + 1)
          var end = date.toISOString().slice(0, 10)
          q = `timeframe:current timeframe:past starts_at:[${start} TO ${end}]`
          // For multi-query, you get next/last 25 per school and no pagination :(
          l = 25
          doMulti = true
          break
        case 'UpcomingListView':
          q = 'timeframe:current timeframe:future'
          s = 'starts_at'
          // For multi-query, you get next/last 25 per school and no pagination :(
          l = 25
          doMulti = true
          break
      }
      args = {s, q, l, ...args}

      if (reset) {
        this.broadcasts = []
        this.pagination = {}
      }

      if (doMulti) {
        Promise.all(
          Config.staticChannels.map((c) => {
            return BoxCastAPI.getChannelBroadcasts(c.id, args)
          })
        ).then((responses) => {
          let thisTripBroadcasts = []
          responses.forEach((response) => {
            thisTripBroadcasts = thisTripBroadcasts.concat(response.broadcasts)
          })
          if (s === 'starts_at') {
            thisTripBroadcasts.sort(compare)
          } else {
            thisTripBroadcasts.sort((a, b) => compare(b, a))
          }
          this.broadcasts = this.broadcasts.concat(thisTripBroadcasts)
          this.loading = false
        }).catch((e) => {
          console.error(e)
        })
      } else {
        this.loading = true
        BoxCastAPI.getChannelBroadcasts(
          this.channelId, args
        ).then((response) => {
          console.log(response)
          this.broadcasts = this.broadcasts.concat(response.broadcasts)
          this.pagination = response.pagination
          this.loading = false
        }).catch((e) => {
          console.error(e)
        })
      }
    }
  }
}

function compare (a, b) {
  if (a.starts_at < b.starts_at) {
    return -1
  } else if (a.starts_at > b.starts_at) {
    return 1
  } else {
    return 0
  }
}
</script>

<style>
.list-enter-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.list-leave-active {
  transition: none;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: scale(.95);
}
</style>

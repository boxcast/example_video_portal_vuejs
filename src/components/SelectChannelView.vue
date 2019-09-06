<template>
  <div class="row">
    <div class="col-12">
      <h2>Select a Channel</h2>
      <transition-group name="list" tag="div" class="row">
        <div v-for="c in channels" :key="c.id" class="col-sm-6 col-md-4 col-lg-3">
          <ChannelCard :channel="c" />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import BoxCastAPI from '@/services/BoxCastAPI'
import Config from '@/config'
export default {
  name: 'SelectChannelView',
  data () {
    return {
      accountChannelId: Config.channelId,
      listView: !!Config.useListView,
      loading: false,
      broadcasts: [],
      pagination: {},
      channelId: null,
      channelIdForBroadcastLink: null,
      channels: Config.staticChannels
    }
  },
  mounted () {
    //this.initChannelId()
    //this.getBroadcasts()
  },
  watch: {
    '$route' (to, from) {
      //this.initChannelId()
      //this.getBroadcasts()
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
          doMulti = true
          break
        case 'UpcomingListView':
          q = 'timeframe:current timeframe:future'
          s = 'starts_at'
          doMulti = true
          break
      }
      args = {s, q, l, ...args}

      if (reset) {
        this.broadcasts = []
        this.pagination = {}
      }

      if (doMulti) {
        this._doLoadMulti(args)
      } else {
        this._doLoadSingle(args)
      }
    },
    _shuffleLiveToTop () {
      this.broadcasts.sort(function (a, b) {
        if (a.timeframe === 'current' && b.timeframe !== 'current') {
          return -1
        } else if (a.timeframe !== 'current' && b.timeframe === 'current') {
          return 1
        } else if (a.timeframe === b.timeframe && a.timeframe !== 'past') {
          // Reverse the "head of the list" that are either upcoming or live -- oldest to furthest in future
          if (a.starts_at < b.starts_at) {
            return -1
          } else if (a.starts_at > b.starts_at) {
            return 1
          } else {
            return 0
          }
        } else {
          // Default sort -- newest to oldest
          if (a.starts_at < b.starts_at) {
            return 1
          } else if (a.starts_at > b.starts_at) {
            return -1
          } else {
            return 0
          }
        }
      })
      console.log('shuffled live', this.broadcasts)
    },
    _doLoadSingle (args) {
      this.loading = true
      return BoxCastAPI.getChannelBroadcasts(
        this.channelId, args
      ).then((response) => {
        console.log(response)
        this.broadcasts = this.broadcasts.concat(response.broadcasts)
        if (!args.p && args.s === '-starts_at') {
          this._shuffleLiveToTop()
        }
        this.pagination = response.pagination
        this.loading = false
      }).catch((e) => {
        console.error(e)
        alert("I'm sorry but there was an error loading the channel. Please refresh and try again.")
      })
    },
    _doLoadMulti (args) {
      this.loading = true
      var commaDelimitedChannels = Config.staticChannels.map((c) => c.id).join(',')
      var accountIdMap = Config.accountIdMap;

      return BoxCastAPI.getChannelBroadcasts(commaDelimitedChannels, args)
      .then((response) => {
        response.broadcasts.forEach((b) => {
          b.__viaRequestedChannelId = accountIdMap[b.account_id]
        })
        return response
      }).then((response) => {
        this.broadcasts = this.broadcasts.concat(response.broadcasts)
        if (!args.p && args.s === '-starts_at') {
          this._shuffleLiveToTop()
        }
        this.pagination = response.pagination
        this.loading = false
      }).catch((e) => {
        console.error(e)
        alert("I'm sorry but there was an error loading the channel. Please refresh and try again.")
      })
    }
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
  opacity: 0.5;
  transform: scale(.95);
}
</style>

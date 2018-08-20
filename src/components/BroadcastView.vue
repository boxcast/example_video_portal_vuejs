<template>
  <div class="row">
    <div class="col-sm-4 col-md-3 col-lg-2">
      <ChannelNav />
    </div>
    <div class="col-sm-8 col-md-9 col-lg-10">
      <div class="row">
        <div class="col-sm-9">
          <!-- Broadcast -->

          <b-alert v-if="loading" variant="info" show>Loading Broadcast...</b-alert>

          <div id="boxcast-container" ref="boxcastContainerEl" style="margin-bottom:30px">
          </div>
        </div>
        <div class="col-sm-3 related-broadcasts">
          <!--
          <h3>Broadcast Information</h3>
          {{broadcast.starts_at}}
          -->

          <h4 class="ellipse text-left">Related Broadcasts</h4>
          <div class="row">
            <div class="col-6 col-sm-12"
                  v-for="b in relatedBroadcasts"
                  v-if="b.id != broadcast.id"
                  :key="b.id">
              <BroadcastCard :broadcast="b" :channelId="channelId" />
            </div>
          </div>

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
      accountChannelId: BoxCastAPI.getAccountChannelId(),
      loading: false,
      relatedBroadcasts: [],
      broadcast: {},
      channelName: ''
    }
  },
  mounted () {
    if (this.$refs.boxcastContainerEl) {
      // eslint-disable-next-line
      this.context = boxcast(`#${this.$refs.boxcastContainerEl.id}`)
      this.initChannelId()
      this.getBroadcast()
    } else {
      console.warn('Unable to find ref to boxcastContainerEl', this.$refs)
    }
  },
  destroyed () {
    this.context.unload()
  },
  watch: {
    '$route' (to, from) {
      this.initChannelId()
      this.getBroadcast()
      window.scrollTo(0, 0)
    }
  },
  methods: {
    initChannelId () {
      if (this.$route && this.$route.query && this.$route.query.channel_id) {
        this.channelId = this.$route.query.channel_id
      } else {
        this.channelId = ''
      }
    },
    getBroadcast () {
      this.broadcast = {}

      let channelId = this.channelId
      if (!channelId || channelId === 'live_recent' || channelId === 'upcoming') {
        console.log('Coercing special channel to account-level query', channelId)
        channelId = this.accountChannelId
      }

      this.context.loadChannel(channelId, {
        disableRedirectRulesOnLoad: true,
        selectedBroadcastId: this.$route.params.broadcast_id,
        onLoadBroadcast: (b) => {
          this.broadcast = b
          this.loading = false

          // XXX:
          // eslint-disable-next-line
          this.relatedBroadcasts = boxcast.model.PlaylistStore.broadcasts
          // eslint-disable-next-line
          this.channelName = boxcast.model.CurrentChannelStore.name
        },
        showTitle: true,
        showDescription: true,
        showRelated: false,
        showCountdown: true
      })
    }
  }
}
</script>

<style>
.container[data-container] {
  max-width: 100%;
}
.related-broadcasts > h4 {
  text-align: left;
  font-size: 12pt;
  color: #fff;
  text-transform: uppercase;
  opacity: 0.6;
}
.boxcast-boxoffice h1.boxcast-title {
  font-size: 18pt;
}
.boxcast-boxoffice p.boxcast-description {
  font-size: 14pt;
  line-height: 1.2em;
}
</style>

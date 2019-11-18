<template>
  <div class="row">
    <div class="col-sm-12 text-left" style="margin-bottom:15px">
      <button class="btn btn-sm btn-outline-secondary"
              title="Show Channel Selector"
              v-if="!showChannelSelector"
              @click="toggleChannelSelector">
        &gt;
      </button>
      <button class="btn btn-sm btn-outline-secondary"
              title="Hide Channel Selector"
              v-if="showChannelSelector"
              @click="toggleChannelSelector">
        &lt;
      </button>
      {{ channelName }}
    </div>
    <div :class="showChannelSelector ? 'col-sm-4 col-md-3 col-lg-2' : 'col-sm-0 col-md-1'">
      <ChannelNav />
    </div>
    <div :class="showChannelSelector ? 'col-sm-8 col-md-9 col-lg-10' : 'col-sm-12 col-md-11'">
      <div class="row">
        <div class="col-sm-9">
          <!-- Broadcast -->

          <b-alert v-if="loading" variant="info" show>Loading Broadcast...</b-alert>

          <div id="boxcast-container" ref="boxcastContainerEl">
          </div>
        </div>
        <div class="col-sm-3">
          <!--
          <h3>Broadcast Information</h3>
          {{broadcast.starts_at}}
          -->

          <p class="ellipse text-left">Related Broadcasts</p>
          <div class="" v-for="b in relatedBroadcasts" :key="b.id">
            <BroadcastCard :broadcast="b" :channelId="channelId" />
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
      showChannelSelector: false,
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
    toggleChannelSelector () {
      this.showChannelSelector = !this.showChannelSelector
    },
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
          this.relatedBroadcasts = boxcast.model.PlaylistStore.broadcasts.filter((b) => b.id !== this.broadcast.id)
          // eslint-disable-next-line
          this.channelName = boxcast.model.CurrentChannelStore.name
        },
        showTitle: true,
        showDescription: true,
        showRelated: false
      })
    }
  }
}
</script>

<style>
</style>

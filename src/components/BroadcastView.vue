<template>
  <div class="row">
    <div class="col-sm-12 text-left">
      <button class="btn btn-default"
              v-if="!showChannelSelector"
              @click="toggleChannelSelector">
        &gt;
      </button>
      <button class="btn btn-default"
              v-if="showChannelSelector"
              @click="toggleChannelSelector">
        &lt;
      </button>
      Channel Name
    </div>
    <div :class="showChannelSelector ? 'col-sm-4 col-md-3 col-lg-2' : 'col-sm-0'">
      <ChannelNav />
    </div>
    <div :class="showChannelSelector ? 'col-sm-8 col-md-9 col-lg-10' : 'col-sm-12'">
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

          <h3>Related Broadcasts</h3>
          <div class=""
                v-for="b in relatedBroadcasts"
                v-if="b.id != broadcast.id"
                :key="b.id">
            <BroadcastCard :broadcast="b" :channelId="channelId" />
          </div>

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
      showChannelSelector: false,
      relatedBroadcasts: [],
      broadcast: {}
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
    console.log('destroying broadcast view')
    this.context.unload()
  },
  watch: {
    '$route' (to, from) {
      this.initChannelId()
      this.getBroadcast()
    }
  },
  methods: {
    toggleChannelSelector () {
      console.log('toggling channel selector')
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
      console.log('Route params', this.$route.params)

      this.broadcast = {}

      let channelId = this.channelId
      if (!channelId || channelId == 'live_recent' || channelId == 'upcoming') {
        console.log('Coercing special channel to account-level query', channelId)
        channelId = this.accountChannelId
      }

      this.context.loadChannel(channelId, {
        disableRedirectRulesOnLoad: true,
        selectedBroadcastId: this.$route.params.broadcast_id,
        onLoadBroadcast: (b) => {
          console.log('Loaded broadcast', b)
          this.broadcast = b
          this.loading = false

          // XXX:
          // eslint-disable-next-line
          this.relatedBroadcasts = boxcast.model.PlaylistStore.broadcasts
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
  .col-sm-0 {
    display: none;
  }
  .card-title, .card-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #boxcast-container .boxcast-well {
    /* reset */
    border: none;
    box-shadow: none;
    text-align: left;
    padding: 0;
    margin: 0;

    /* clean */
    margin-top: 15px;
    padding: 15px;
  }
</style>

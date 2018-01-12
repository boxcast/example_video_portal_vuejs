<template>
  <div class="row">
    <div class="col-sm-9 col-md-8">
      <!-- Broadcast -->

      <b-alert v-if="loading" variant="info" show>Loading Broadcast...</b-alert>

      <div id="boxcast-container" ref="boxcastContainerEl">
      </div>
    </div>
    <div class="col-sm-3 col-md-4">
      <!-- Related Info -->
      <h3>Broadcast Information</h3>
      {{broadcast.starts_at}}


      <h3>Related Broadcasts</h3>
      <div class=""
            v-for="b in relatedBroadcasts"
            :key="b.id">
        <b-card
          :title="b.name"
          :img-src="b.preview"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2">
          <p class="card-text">
          {{b.description || '&nbsp;'}}
          </p>
          <b-button :href="'#/broadcasts/'+b.id" variant="primary">Watch</b-button>
        </b-card>
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
      relatedBroadcasts: [],
      broadcast: {}
    }
  },
  mounted () {
    if (this.$refs.boxcastContainerEl) {
      // eslint-disable-next-line
      this.context = boxcast(`#${this.$refs.boxcastContainerEl.id}`)
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
      this.getBroadcast()
    }
  },
  methods: {
    getBroadcast () {
      console.log('Route params', this.$route.params)

      this.broadcast = {}

      console.log('Loading channel', this.accountChannelId, 'and id', this.$route.params.broadcast_id)
      this.context.loadChannel(this.accountChannelId, {
        disableRedirectRulesOnLoad: true,
        selectedBroadcastId: this.$route.params.broadcast_id,
        onLoadBroadcast: (b) => {
          console.log('Loaded broadcast', b)
          this.broadcast = b
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
  .card-title, .card-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

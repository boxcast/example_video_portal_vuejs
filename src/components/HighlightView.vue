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
    <div :class="showChannelSelector ? 'col-sm-4 col-md-3 col-lg-2' : 'col-sm-0'">
      <ChannelNav />
    </div>
    <div :class="showChannelSelector ? 'col-sm-8 col-md-9 col-lg-10' : 'col-sm-12'">
      <!-- Highlight -->

      <b-alert v-if="loading" variant="info" show>Loading Highlight ...</b-alert>

      <h3>{{highlight.name}}</h3>

      <div id="boxcast-container" ref="boxcastContainerEl">
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
      showChannelSelector: true,
      highlight: {},
      channelName: ''
    }
  },
  mounted () {
    if (this.$refs.boxcastContainerEl) {
      // eslint-disable-next-line
      this.context = boxcast(`#${this.$refs.boxcastContainerEl.id}`)
      this.getHighlight()
    } else {
      console.warn('Unable to find ref to boxcastContainerEl', this.$refs)
    }
  },
  destroyed () {
    this.context.unload()
  },
  watch: {
    '$route' (to, from) {
      this.getHighlight()
      window.scrollTo(0, 0)
    }
  },
  methods: {
    toggleChannelSelector () {
      this.showChannelSelector = !this.showChannelSelector
    },
    getHighlight () {
      this.highlight = {}

      this.context.loadHighlight(this.$route.params.highlight_id, {
        disableRedirectRulesOnLoad: true,
        onLoadHighlight: (h) => {
          console.log(h)
          this.highlight = h
          this.loading = false
        }
      })
    }
  }
}
</script>

<style>
</style>

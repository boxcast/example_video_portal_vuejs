<template>
  <div class="row">
    <div class="col-sm-4 col-md-3 col-lg-2">
      <ChannelNav />
    </div>
    <div class="col-sm-8 col-md-9 col-lg-10">
      <b-alert v-if="loading && highlights.length == 0" variant="info" show>Loading Highlights...</b-alert>
      <b-alert v-if="!loading && highlights.length == 0" variant="info" show>
        There are no highlights.
      </b-alert>
      <div class="row">
        <div v-for="b in highlights" :key="b.id" class="col-sm-6 col-md-4 col-lg-3">
          <BroadcastCard :broadcast="b" :channelId="channelIdForBroadcastLink" />
        </div>
      </div>
      <div class="row" v-if="pagination.next" style="margin-bottom:15px">
        <div class="col-sm-12">
          <button class="btn btn-lg btn-secondary btn-block"
                  @click="getHighlights(false, {p: pagination.next})"
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
export default {
  name: 'ChannelListView',
  data () {
    return {
      accountChannelId: BoxCastAPI.getAccountChannelId(),
      loading: false,
      highlights: [],
      pagination: {},
      channelId: BoxCastAPI.getAccountChannelId(),
      channelIdForBroadcastLink: 'highlights'
    }
  },
  mounted () {
    this.getHighlights()
  },
  watch: {
    '$route' (to, from) {
      this.getHighlights()
      window.scrollTo(0, 0)
    }
  },
  methods: {
    getHighlights (reset = true, args = {}) {
      if (!this.channelId) {
        console.warn('No channel ID provided for route')
        return
      }

      let s = '-streamed_at'
      let l = 20
      args = {s, l, ...args}

      if (reset) {
        this.highlights = []
      }
      this.loading = true

      BoxCastAPI.getChannelHighlights(
        this.channelId, args
      ).then((response) => {
        console.log(response)
        this.highlights = this.highlights.concat(response.highlights)
        this.pagination = response.pagination
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

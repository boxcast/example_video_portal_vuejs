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
  </div>
</template>

<script>
export default {
  name: 'ChannelListView',
  data () {
    return {
      accountId: 'DEMODEMO', // TODO: configure this
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
    getBroadcasts() {
      console.log('Route params', this.$route.params)
      this.broadcasts = []
      if (!this.$route.params.id) {
        return;
      }
      this.loading = true
      // eslint-disable-next-line
      boxcast.getChannelBroadcasts(
        this.$route.params.id,
        {q: 'timeframe:relevant', s: '-starts_at', l: 20}
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
  .card-title, .card-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

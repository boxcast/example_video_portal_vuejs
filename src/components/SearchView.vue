<template>
  <div class="row">
    <div class="col-sm-4 col-md-3 col-lg-2">
      <ChannelNav />
    </div>
    <div class="col-sm-8 col-md-9 col-lg-10">
      <form class="form-inline mb-4" @submit.prevent="search">
        <div class="form-group">
          <input type="text" class="form-control form-control-lg mr-2" v-model="q" lazy placeholder="Search...">
        </div>
        <button type="submit" class="btn btn-primary btn-lg">Search</button>
      </form>

      <b-alert v-if="loading && broadcasts.length == 0" variant="info" show>Searching...</b-alert>
      <b-alert v-if="!loading && lastQ && broadcasts.length == 0" variant="info" show>
        No broadcasts were found for {{lastQ}}.
      </b-alert>
      <div class="row">
        <div v-for="b in broadcasts" :key="b.id" class="col-sm-6 col-md-4 col-lg-3">
          <BroadcastCard :broadcast="b" :channelId="b.__viaRequestedChannelId" />
        </div>
      </div>
      <div class="row" v-if="pagination.next" style="margin-bottom:15px">
        <div class="col-sm-12">
          <button class="btn btn-lg btn-secondary btn-block"
                  @click="search(false, {p: pagination.next})"
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
  name: 'SearchView',
  data () {
    return {
      q: '',
      lastQ: '',
      loading: false,
      broadcasts: [],
      pagination: {},
      channelId: BoxCastAPI.getAccountChannelId(),
      channelIdForBroadcastLink: BoxCastAPI.getAccountChannelId()
    }
  },
  methods: {
    search (reset = true, args = {}) {
      this.lastQ = this.q
      if (!this.q) {
        return
      }
      this.loading = true
      if (reset) {
        this.broadcasts = []
        this.pagination = {}
      }

      let s = '-starts_at'
      let l = 20
      let q = this.q
      args = {s, l, q, ...args}

      var commaDelimitedChannels = Config.staticChannels.map((c) => c.id).join(',')
      var accountIdMap = {}
      Config.staticChannels.forEach((c) => accountIdMap[c.accountId] = c.id)


      BoxCastAPI.getChannelBroadcasts(
        commaDelimitedChannels, args
      ).then((response) => {
        response.broadcasts.forEach((b) => {
          b.__viaRequestedChannelId = accountIdMap[b.account_id]
        })
        return response
      }).then((response) => {
        this.broadcasts = this.broadcasts.concat(response.broadcasts)
        this.pagination = response.pagination
        this.loading = false
      }).catch((e) => {
        this.loading = false
        console.error(e)
      })
    }
  }
}
</script>

<style scoped>
</style>

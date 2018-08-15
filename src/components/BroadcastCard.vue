<template>
  <a class="card mb-4" :href="link" target="_self">
    <div class="card-img-top">
      <div class="fixed-16-9">
        <div :style="bgStyle" v-if="broadcast.preview">
          <div class="timeframe badge badge-danger" v-if="timeframe == 'current'">
            LIVE
          </div>
          <div class="timeframe badge badge-warning" v-if="timeframe == 'future'">
            Upcoming
          </div>
          <div class="timeframe badge badge-secondary" v-if="timeframe == 'past' || timeframe == 'recently-ended'">
            Recorded
          </div>
          <span :class="'mascac-logo ' + icon" v-if="icon" style="zoom:0.5;position:absolute;right:10px;bottom:0;top:auto;left:auto;margin:0;"></span>
        </div>
        <div class="no-preview" v-if="!broadcast.preview">
          <div class="timeframe badge badge-danger" v-if="timeframe == 'current'">
            LIVE
          </div>
          <div class="timeframe badge badge-warning" v-if="timeframe == 'future'">
            Upcoming
          </div>
          <div class="timeframe badge badge-secondary" v-if="timeframe == 'past' || timeframe == 'recently-ended'">
            Recorded
          </div>
          <span :class="'mascac-logo ' + icon" v-if="icon" style="margin:0;"></span>
        </div>
      </div>
    </div>
    <div class="card-body">
      <p class="card-text ellipse"><small>{{accountName}}</small></p>
      <h4 class="card-title">
        {{broadcast.name}}
      </h4>
      <p class="card-text ellipse"><small>{{description}}</small></p>
    </div>
  </a>
</template>

<script>
import BoxCastAPI from '@/services/BoxCastAPI'
import Config from '@/config'
export default {
  name: 'BroadcastCard',
  props: [
    'broadcast',
    'channelId'
  ],
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
    accountName () {
      let cfg = Config.staticChannels.filter((c) => c.accountId === this.broadcast.account_id)
      return cfg && cfg[0] && cfg[0].name
    },
    icon () {
      let cfg = Config.staticChannels.filter((c) => c.accountId === this.broadcast.account_id)
      return cfg && cfg[0] && cfg[0].abbrev
    },
    link () {
      if (this.channelId === 'highlights') {
        return `#/highlights/${this.broadcast.id}`
      } else {
        return `#/broadcasts/${this.broadcast.id}?channel_id=${this.channelId}`
      }
    },
    bgStyle () {
      return {
        'background-image': `url("${this.broadcast.preview}")`,
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-position': '50% 50%'
      }
    },
    timeframe () {
      return BoxCastAPI.utils.timeframe(this.broadcast)
    },
    description () {
      let prefix = ''
      switch (this.timeframe) {
        case 'future':
          prefix = `Starts ${BoxCastAPI.utils.formatRelative(this.broadcast.starts_at, '')}`
          break
        case 'current':
          break
        case 'recently-ended':
        case 'past':
          prefix = `Ended ${BoxCastAPI.utils.formatRelative(this.broadcast.stops_at, '', '')}`
          break
      }
      if (prefix && this.broadcast.description) {
        return `${prefix} - ${this.broadcast.description}`
      } else if (prefix) {
        return prefix
      } else {
        return this.broadcast.description
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  a.card, a.card:hover, a.card:focus {
    display: block;
    text-decoration: none;
    color: inherit;
    transition: transform 100ms ease-in-out;
  }
  a.card:hover {
    transform: scale(1.05);
  }
  .card-title, .card-text {
    text-align: left;
    font-size: 1rem;
    margin-bottom: 0;
  }
  .card-title {
    font-weight: 800;
  }
  .card-title {
    /* ellipse after approx 2 lines */
    height: 38px;
    overflow:hidden;
  }
  .card-body {
    padding: 10px 5px;
  }
  .no-preview {
    color: rgba(255,255,255,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .timeframe {
    position: absolute;
    left: 5px;
    top: 5px;
  }
</style>


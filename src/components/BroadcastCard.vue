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
        </div>
        <div class="no-preview" v-if="!broadcast.preview">
          Preview not available
          <div class="timeframe badge badge-danger" v-if="timeframe == 'current'">
            LIVE
          </div>
          <div class="timeframe badge badge-warning" v-if="timeframe == 'future'">
            Upcoming
          </div>
          <div class="timeframe badge badge-secondary" v-if="timeframe == 'past' || timeframe == 'recently-ended'">
            Recorded
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h4 class="card-title">{{broadcast.name}}</h4>
      <p class="card-text ellipse"><small>{{description}}</small></p>
    </div>
  </a>
</template>

<script>
import BoxCastAPI from '@/services/BoxCastAPI'
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


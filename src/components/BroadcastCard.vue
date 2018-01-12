<template>
  <a class="card mb-4" :href="'#/broadcasts/'+broadcast.id+'?channel_id='+channelId" target="_self">
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
            Starts Soon
          </div>
          <div class="timeframe badge badge-secondary" v-if="timeframe == 'past' || timeframe == 'recently-ended'">
            Recorded
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h4 class="card-title ellipse">{{broadcast.name}}</h4>
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
          prefix = `Starts ${BoxCastAPI.utils.formatRelative(this.broadcast.starts_at, 'in')} - `
          break
        case 'current':
          break
        case 'recently-ended':
        case 'past':
          prefix = `Ended ${BoxCastAPI.utils.formatRelative(this.broadcast.stops_at, '', 'ago')} - `
          break
      }
      return `${prefix}${this.broadcast.description || ''}`
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
    font-size: 1rem;
    margin-bottom: 0;
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


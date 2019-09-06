<template>
  <a class="card mb-4" :href="link" target="_self">
    <!--div class="card-img-top">
      <div class="fixed-16-9">
        <div :style="bgStyle" v-if="channel.preview">
        </div>
        <div class="no-preview" v-if="!channel.preview">
        </div>
      </div>
    </div-->
    <div class="card-body">
      <h4 class="card-title text-center">
        {{channel.name}}
      </h4>
      <!--p class="card-text ellipse"><small>{{channel.description}}</small></p-->
    </div>
  </a>
</template>

<script>
import BoxCastAPI from '@/services/BoxCastAPI'
import Config from '@/config'
export default {
  name: 'ChannelCard',
  props: [
    'channel',
  ],
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
    link () {
      return `#/channels/${this.channel.id}`
    },
    bgStyle () {
      return {
        'background-image': `url("${this.channel.preview}")`,
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-position': '50% 50%'
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


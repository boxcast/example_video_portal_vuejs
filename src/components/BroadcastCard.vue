<template>
  <article class="card mb-2">
    <div class="card-img-top">
      <div class="fixed-16-9">
        <div :style="bgStyle()" v-if="broadcast.preview"></div>
        <div v-if="!broadcast.preview">Preview not available</div>
      </div>
    </div>
    <div class="card-body">
      <h4 class="card-title">{{broadcast.name}}</h4>
      <p class="card-text">
      {{broadcast.description || '&nbsp;'}}
      </p>
      <a :href="'#/broadcasts/'+broadcast.id" target="_self" class="btn btn-primary btn-sm btn-block">Watch</a>
    </div>
  </article>
</template>

<script>
export default {
  name: 'BroadcastCard',
  props: [
    'broadcast'
  ],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    bgStyle () {
      return {
        'background-image': `url("${(this.broadcast || {}).preview}")`,
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-position': '50% 50%'
      }
    }
  }
}
</script>

<style scoped>
  .fixed-16-9 {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    background: black;
  }
  .fixed-16-9 > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .card-title, .card-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1rem;
    margin-bottom: 0;
  }
</style>


<template>
  <article class="card mb-2">
    <img :src="broadcast.preview"
         alt="Image" class="card-img-top">
    <div class="card-body">
      <h4 class="card-title">{{broadcast.name}}</h4>
      <p class="card-text">
      {{broadcast.description || '&nbsp;'}}
      </p>
      <a :href="'#/broadcasts/'+broadcast.id" target="_self" class="btn btn-primary">Watch</a>
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


<template>
  <div>
    <div class="card mb-4">
      <div class="card-img-top">
        <div class="fixed-16-9">
          <div class="no-preview">
            <div class="timeframe badge badge-secondary">
              Loading
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <p class="card-text ellipse"><small><span style="width:50%">&nbsp;</span></small></p>
        <h4 class="card-title"><span style="width: 90%">&nbsp;</span></h4>
        <p class="card-text ellipse"><small><span style="width: 80%">&nbsp;</span></small></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BroadcastSkeleton',
}
</script>

<style scoped>
  .card, .card:hover, .card:focus {
    opacity: 0.3;
    display: block;
    text-decoration: none;
    color: inherit;
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
    color: rgba(255,255,255,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .timeframe {
    position: absolute;
    left: 5px;
    top: 5px;
  }


  .card {
    transform: scale(.95);
  }
  .card-title span, .card-text span {
    display: inline-block;
    background: rgba(255,255,255,0.5);
    font-size: 0.5em;
  }
</style>


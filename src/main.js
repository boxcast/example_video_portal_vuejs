// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import BroadcastCard from '@/components/BroadcastCard'
import BroadcastRow from '@/components/BroadcastRow'
import BroadcastSkeleton from '@/components/BroadcastSkeleton'
import ChannelNav from '@/components/ChannelNav'

Vue.use(BootstrapVue)
Vue.component('BroadcastCard', BroadcastCard)
Vue.component('BroadcastRow', BroadcastRow)
Vue.component('BroadcastSkeleton', BroadcastSkeleton)
Vue.component('ChannelNav', ChannelNav)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, ChannelNav }
})

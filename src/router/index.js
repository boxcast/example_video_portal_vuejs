import Vue from 'vue'
import Router from 'vue-router'
import ChannelListView from '@/components/ChannelListView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LiveAndRecentListView',
      component: ChannelListView
    },
    {
      path: '/upcoming',
      name: 'UpcomingListView',
      component: ChannelListView
    },
    {
      path: '/channels/:id',
      name: 'ChannelListView',
      component: ChannelListView
    },
    {
      path: '/broadcasts/:id',
      name: 'BroadcastView',
      component: ChannelListView
    }
  ]
})

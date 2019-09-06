import Vue from 'vue'
import Router from 'vue-router'
import ChannelListView from '@/components/ChannelListView'
import HighlightsListView from '@/components/HighlightsListView'
import BroadcastView from '@/components/BroadcastView'
import HighlightView from '@/components/HighlightView'
import SearchView from '@/components/SearchView'
import SelectChannelView from '@/components/SelectChannelView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SelectChannelView',
      component: SelectChannelView
    },
    /*
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
      path: '/highlights',
      name: 'HighlightsListView',
      component: HighlightsListView
    },
    {
      path: '/search',
      name: 'SearchView',
      component: SearchView
    },
    */
    {
      path: '/channels/:id',
      name: 'ChannelListView',
      component: ChannelListView
    },
    {
      path: '/broadcasts/:broadcast_id',
      name: 'BroadcastView',
      component: BroadcastView
    },
    {
      path: '/highlights/:highlight_id',
      name: 'HighlightView',
      component: HighlightView
    }
  ]
})

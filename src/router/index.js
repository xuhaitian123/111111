import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Layout from '../views/layout/Layout'
import Dashboard from  '../views/Dashboard/Dashboard'
import CongestionMap from  '../views/Dashboard/CongestionMap'
import Map from '../views/Map/Map'
import TrafficVideo from  '../views/TrafficVideo/TrafficVideo'
import RoadSectionMap from  '../views/Dashboard/RoadSectionMap'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      component: Layout,
      name: 'Layout',
      redirect: '/main/dashboard',
      children: [
        {
          path: 'dashboard',
          component: Dashboard,
          name: 'Dashboard'
        }
      ],
    },
    {
      path: '/main',
      component: Layout,
      name: 'Layout',
      redirect: '/main/dashboard',
      children: [
        {
          path: 'congestionMap',
          component: CongestionMap,
          name: 'CongestionMap'
        }
      ],
    },
    {
      path: '/main',
      component: Layout,
      name: 'Layout',
      redirect: '/main/dashboard',
      children: [
        {
          path: 'roadSectionMap/:id',
          component: RoadSectionMap,
          name: 'RoadSectionMap'
        }
      ],
    },
    {
      path: '/main',
      component: Layout,
      name: 'Layout',
      // redirect: '/main/map',
      children: [
        {
          path: 'map',
          component: Map,
          name: 'map'
        }
      ],
    },
    {
      path: '',
      component: Layout,
      name: 'Layout',
      redirect: '/main/map',
      children: [
        {
          path: 'map',
          component: Map,
          name: 'map'
        }
      ],
    },
    {
      path: '/main',
      component: Layout,
      name: 'Layout',
      // redirect: '/main/map',
      children: [
        {
          path: 'trafficVideo',
          component: TrafficVideo,
          name: 'trafficVideo'
        }
      ],
    },
  ]
})

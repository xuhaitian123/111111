import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Layout from '../views/layout/Layout'
import LayoutMap from '../views/layout/LayoutMap'
import Dashboard from  '../views/Dashboard/Dashboard'
import CongestionMap from  '../views/Dashboard/CongestionMap'
import RoadSectionMap from  '../views/Dashboard/RoadSectionMap'
import IntersectionsMap from  '../views/Dashboard/IntersectionsMap'
import Map from '../views/Map/Map'
import TrafficVideo from  '../views/TrafficVideo/TrafficVideo' //TODO
import Login from '../views/Login/Login'
import signalOptimization from '../views/signalOptimization/signalOptimization'
import FirstPassSetting from '../views/IntelSignalLampOptimize/FirstPassSetting'
import SignalLampControl from '../views/IntelSignalLampOptimize/SignalLampControl'
import DataAnalyse from '../views/dataAnalyse/dataAnalyse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: Login,
      name: 'Layout'
    },
    {
      path: '/login',
      component: Login,
      name: 'Layout'
    },
    {
      path:'/dataAnalyse',
      component:Layout,
      name:'dataAnalyse',
      children:[
        {
          path: 'dataAnalyse',
          component: DataAnalyse,
          name: 'dataAnalyse'
        }
      ]
    },
    {
      path: '/main',
      component: LayoutMap,
      name: 'LayoutMap',
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
      children: [
        {
          path: 'intersectionsMap/:id',
          component: IntersectionsMap,
          name: 'IntersectionsMap'
        }
      ],
    },

    {
      path: '/main',
      component: Layout,
      name: 'Layout',
      children: [
        {
          path: 'trafficVideo/:nodeId',
          component: TrafficVideo,
          name: 'trafficVideo'
        }
      ],
    },
    {
      path: '/main',
      component: Layout,
      name: 'Layout',
      children: [
        {
          path: 'firstPassSetting',
          component: FirstPassSetting,
          name: 'FirstPassSetting'
        }
      ],
    },
    {
      path: '/main',
      component: Layout,
      name: 'Layout',
      children: [
        {
          path: 'signalLampControl',
          component: SignalLampControl,
          name: 'SignalLampControl'
        }
      ],
    },
    {
      path: '/signalOptimization',
      component: Layout,
      name: 'signalOptimization',
      // redirect: '/signalOptimization/signalOptimization',
      children: [
        {
          path: 'signalOptimization',
          component: signalOptimization,
          name: 'signalOptimization'
        }
      ],
    },
  ]
})

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
import DataAnalyse from '../views/IntelSignalLampOptimize/dataAnalyse'
import car_info_table from "../views/car_info/car_info_table"
import AllViolationInformation from "../views/car_info/AllViolationInformation"
import AllCarInformation from "../views/car_info/AllCarInformation"
import VisualChart from "../views/car_info/VisualChart"
import Excel from "../views/dataImport/Excel"
import  select_violation_car  from  '../views/car_info/select_violation_car'
import  all_reg_car_loaction  from  '../views/car_info/all_reg_car_loaction'
import  user  from  '../views/userInfo/user'
import  auth  from  '../views/userInfo/auth'
import  InformationUpadte  from  '../views/Information/InformationUpadte'
import  InformationEntry  from  '../views/Information/InformationEntry'

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
      path: '/car',
      component: Layout,
      name: 'Layout',
      children: [
        {
          path: 'car_info_table',
          component: car_info_table,
          name: 'car_info_table'
        },
        {
          path: 'VisualChart',
          component: VisualChart,
          name: 'VisualChart'
        },
        {
          path: 'all_reg_car_loaction',
          component: all_reg_car_loaction,
          name: 'all_reg_car_loaction'
        },
        {
          path: 'AllViolationInformation',
          component: AllViolationInformation,
          name: 'AllViolationInformation'
        },
        {
          path: 'select_violation_car',
          component: select_violation_car,
          name: 'select_violation_car'
        },
        {
          path: 'AllCarInformation',
          component: AllCarInformation,
          name: 'AllCarInformation',
        },    
      ],
    },
    {
      path: '/dataImport',
      component: Layout,
      name: 'Layout',
      children: [
        {
          path: 'Excel',
          component: Excel,
          name: 'Excel'
        }
      ],
    },
    {
      path: '/userInfo',
      component: Layout,
      name: 'Layout',
      children: [
        {
          path: 'user',
          component: user,
          name: 'user'
        },
        {
          path: 'auth',
          component: auth,
          name: 'auth'
        }
      ],
    },
    {
      path: '/Information',
      component: Layout,
      name: 'Layout',
      children: [
        {
          path: 'InformationUpadte',
          component: InformationUpadte,
          name: 'InformationUpadte'
        },
        {
          path: 'InformationEntry',
          component: InformationEntry,
          name: 'InformationEntry'
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
      path: '/intelSignalLampOptimize',
      component: Layout,
      name: 'Layout',
      children: [
        {
          path: 'firstPassSetting',
          component: FirstPassSetting,
          name: 'FirstPassSetting'
        },
        {
          path: 'signalLampControl',
          component: SignalLampControl,
          name: 'SignalLampControl'
        },
        {
          path: 'dataAnalyse',
          component: DataAnalyse,
          name: 'dataAnalyse'
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

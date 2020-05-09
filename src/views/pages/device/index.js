export default {
  permission: '',
  icon: 'icon-nibianqi',
  path: '/bus/device',
  name: 'bus-device',
  meta: {
    title: 'deviceM'
  },
  children: [
    {
      permission: '',
      path: '/bus/device/inverter',
      name: 'bus-device-inverter',
      meta: {
        title: 'invertM',
        component: () => import(/* webpackChunkName: "bus-device-inverter" */ '@/views/pages/device/inverterList')
      }
    },
    {
      permission: '',
      path: '/bus/device/battery',
      name: '/bus-device-battery',
      meta: {
        title: 'batteryM',
        component: () => import(/* webpackChunkName: "bus-device-battery" */ '@/views/pages/demo')
      }
    },
    {
      permission: '',
      path: '/bus/device/module',
      name: '/bus-device-module',
      meta: {
        title: 'moduleM',
        component: () => import(/* webpackChunkName: "bus-device-module" */ '@/views/pages/device/moduleList')
      }
    },
    {
      permission: '',
      path: '/bus/device/inverter/inverterDetail',
      name: 'bus-device-inverterDetail',
      hidden: true,
      meta: {
        title: '逆变器详情',
        component: () => import(/* webpackChunkName: "bus-device-inverterDetail" */ '@/views/pages/device/inverterDetail')
      }
    },
    {
      permission: '',
      path: '/bus/device/inverter/remoteSetting',
      name: 'bus-device-remoteSetting',
      hidden: true,
      meta: {
        title: 'remoteS',
        component: () => import(/* webpackChunkName: "bus-device-remoteSetting" */ '@/views/pages/device/remoteSetting')
      }
    }
  ]
}

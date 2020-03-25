export default {
  permission: '',
  icon: 'icon-nibianqi',
  path: '/bus/device',
  name: 'bus-device',
  meta: {
    title: '设备管理'
  },
  children: [
    {
      permission: '',
      path: '/bus/device/inverter',
      name: 'bus-device-inverter',
      meta: {
        title: '逆变器管理',
        component: () => import(/* webpackChunkName: "bus-device-inverter" */ '@/views/pages/demo')
      }
    },
    {
      permission: '',
      path: '/bus/device/battery',
      name: '/bus-device-battery',
      meta: {
        title: '电池管理',
        component: () => import(/* webpackChunkName: "bus-device-battery" */ '@/views/pages/demo')
      }
    },
    {
      permission: '',
      path: '/bus/device/module',
      name: '/bus-device-module',
      meta: {
        title: '模块管理',
        component: () => import(/* webpackChunkName: "bus-device-module" */ '@/views/pages/demo')
      }
    }
  ]
}

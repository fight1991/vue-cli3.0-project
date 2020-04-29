export default {
  permission: '',
  icon: 'icon-nibianqi',
  path: '/bus/version',
  name: 'bus-version',
  meta: {
    title: '版本管理'
  },
  children: [
    {
      permission: '',
      path: '/bus/version/firmware',
      name: 'bus-version-firmware',
      meta: {
        title: '固件版本',
        component: () => import(/* webpackChunkName: "bus-version-firmware" */ '@/views/pages/version/firmware')
      }
    },
    {
      permission: '',
      path: '/bus/version/inverRemote',
      name: '/bus-version-inverRemote',
      meta: {
        title: '逆变器远程升级',
        component: () => import(/* webpackChunkName: "bus-version-inverRemote" */ '@/views/pages/version/inverRemote')
      }
    },
    {
      permission: '',
      path: '/bus/version/moduRemote',
      name: '/bus-version-moduRemote',
      meta: {
        title: '模块远程升级',
        component: () => import(/* webpackChunkName: "bus-device-module" */ '@/views/pages/version/moduRemote')
      }
    }
  ]
}

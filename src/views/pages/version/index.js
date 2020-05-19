export default {
  permission: '',
  icon: 'icon-banbenxinxi',
  path: '/bus/version',
  name: 'bus-version',
  meta: {
    title: 'versionM'
  },
  children: [
    {
      permission: '',
      path: '/bus/version/firmware',
      name: 'bus-version-firmware',
      meta: {
        title: 'firmware',
        component: () => import(/* webpackChunkName: "bus-version-firmware" */ '@/views/pages/version/firmware')
      }
    },
    {
      permission: '',
      path: '/bus/version/inverRemote',
      name: '/bus-version-inverRemote',
      meta: {
        title: 'inverUp',
        component: () => import(/* webpackChunkName: "bus-version-inverRemote" */ '@/views/pages/version/inverRemote')
      }
    },
    {
      permission: '',
      path: '/bus/version/moduRemote',
      name: '/bus-version-moduRemote',
      meta: {
        title: 'moduleUp',
        component: () => import(/* webpackChunkName: "bus-device-module" */ '@/views/pages/version/moduRemote')
      }
    }
  ]
}

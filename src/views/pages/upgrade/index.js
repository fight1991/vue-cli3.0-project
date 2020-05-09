export default {
  permission: '',
  icon: 'icon-ssh',
  path: '/bus/upgrade',
  name: 'bus-upgrade',
  meta: {
    title: 'remoteUp',
    component: () => import(/* webpackChunkName: "bus-upgrade" */ '@/views/pages/demo')
  }
}

export default {
  permission: '',
  icon: 'icon-ssh',
  path: '/bus/upgrade',
  name: 'bus-upgrade',
  meta: {
    title: '远程升级',
    component: () => import(/* webpackChunkName: "bus-upgrade" */ '@/views/pages/demo')
  }
}

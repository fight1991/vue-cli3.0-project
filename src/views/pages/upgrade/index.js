export default {
  permission: '',
  icon: 'icon-ssh',
  path: '/upgrade',
  name: 'upgrade',
  meta: {
    title: '远程升级',
    component: () => import(/* webpackChunkName: "upgrade" */ '@/views/pages/demo')
  }
}

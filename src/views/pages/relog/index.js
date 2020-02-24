export default {
  permission: '',
  icon: 'icon-wj-rz',
  path: '/relog',
  name: 'relog',
  meta: {
    title: '日志系统',
    component: () => import(/* webpackChunkName: "relog" */ '@/views/pages/demo')
  }
}

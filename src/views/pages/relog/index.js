export default {
  permission: '',
  icon: 'icon-log',
  path: '/bus/relog',
  name: 'bus-relog',
  meta: {
    title: '日志系统',
    component: () => import(/* webpackChunkName: "bus-relog" */ '@/views/pages/demo')
  }
}

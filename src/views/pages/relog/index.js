export default {
  permission: '',
  icon: 'icon-log',
  path: '/bus/relog',
  name: 'bus-relog',
  meta: {
    title: 'relog',
    component: () => import(/* webpackChunkName: "bus-relog" */ '@/views/pages/demo')
  }
}

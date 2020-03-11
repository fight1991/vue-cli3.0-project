export default {
  permission: '',
  icon: 'icon-dianchi',
  path: '/bus/battery',
  name: 'bus-battery',
  meta: {
    title: '电池管理',
    component: () => import(/* webpackChunkName: "bus-battery" */ '@/views/pages/demo')
  }
}

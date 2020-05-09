export default {
  permission: '',
  icon: 'icon-dianchi',
  path: '/bus/battery',
  name: 'bus-battery',
  meta: {
    title: 'batteryM',
    component: () => import(/* webpackChunkName: "bus-battery" */ '@/views/pages/demo')
  }
}

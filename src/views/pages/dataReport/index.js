export default {
  permission: '',
  icon: 'icon-data-report',
  path: '/bus/dataReport',
  name: 'bus-dataReport',
  meta: {
    title: 'data',
    component: () => import(/* webpackChunkName: "bus-dataReport" */ '@/views/pages/demo')
  }
}

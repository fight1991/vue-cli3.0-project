export default {
  permission: '',
  icon: 'icon-data-report',
  path: '/bus/dataReport',
  name: 'bus-dataReport',
  meta: {
    title: '数据报表',
    component: () => import(/* webpackChunkName: "bus-dataReport" */ '@/views/pages/demo')
  }
}

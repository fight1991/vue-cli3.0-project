export default {
  permission: '',
  icon: 'icon-dashboard',
  path: '/bus/dataView',
  name: 'bus-data-view',
  meta: {
    title: '数据概览',
    component: () => import(/* webpackChunkName: "bus-data-view" */ '@/views/pages/dataView/dataBoard')
  }
}

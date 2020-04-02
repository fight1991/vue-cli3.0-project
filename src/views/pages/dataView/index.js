export default {
  permission: '',
  icon: 'icon-dashboard',
  path: '/bus/dataView',
  name: 'bus-data-view',
  meta: {
    title: '数据概览',
    page: 'board',
    component: () => import(/* webpackChunkName: "bus-plant-detail" */ '@/views/pages/plant/plantDetail')
  }
}

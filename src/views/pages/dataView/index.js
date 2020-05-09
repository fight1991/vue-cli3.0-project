export default {
  permission: '',
  icon: 'icon-dashboard',
  path: '/bus/dataView',
  name: 'bus-data-view',
  meta: {
    title: 'board',
    page: 'board',
    component: () => import(/* webpackChunkName: "bus-plant-detail" */ '@/views/pages/plant/plantDetail')
  }
}

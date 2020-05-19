export default {
  icon: 'icon-dashboard',
  path: '/bus/dataView',
  name: 'bus-data-view',
  meta: {
    permission: [1],
    title: 'board',
    page: 'board',
    component: () => import(/* webpackChunkName: "bus-plant-detail" */ '@/views/pages/plant/plantDetail')
  }
}

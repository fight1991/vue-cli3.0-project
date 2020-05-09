export default {
  permission: '',
  icon: 'icon-sale',
  path: '/bus/afterSale',
  name: 'bus-afterSale',
  meta: {
    title: 'afterSale',
    component: () => import(/* webpackChunkName: "bus-afterSale" */ '@/views/pages/demo')
  }
}

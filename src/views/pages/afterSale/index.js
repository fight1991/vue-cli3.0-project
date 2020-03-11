export default {
  permission: '',
  icon: 'icon-sale',
  path: '/bus/afterSale',
  name: 'bus-afterSale',
  meta: {
    title: '售后管理',
    component: () => import(/* webpackChunkName: "bus-afterSale" */ '@/views/pages/demo')
  }
}

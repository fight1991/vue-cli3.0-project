export default {
  permission: '',
  icon: 'icon-shouhouguanli',
  path: '/afterSale',
  name: 'afterSale',
  meta: {
    title: '售后管理',
    component: () => import(/* webpackChunkName: "afterSale" */ '@/views/pages/demo')
  }
}

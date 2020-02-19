export default {
  permission: '',
  icon: 'el-icon-eleme',
  path: '/afterSale',
  name: 'afterSale',
  meta: {
    title: '售后管理',
    component: () => import(/* webpackChunkName: "afterSale" */ '@/views/pages/demo')
  }
}

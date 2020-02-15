export default {
  permission: '',
  icon: 'el-icon-eleme',
  path: 'customer',
  name: 'customer',
  meta: {
    title: '客户管理',
    component: () => import(/* webpackChunkName: "customer" */ '@/views/pages/demo')
  }
}

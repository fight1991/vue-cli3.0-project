export default {
  permission: '',
  icon: 'el-icon-eleme',
  path: '/factory',
  name: 'factory',
  meta: {
    title: '工厂管理',
    component: () => import(/* webpackChunkName: "factory" */ '@/views/pages/demo')
  }
}

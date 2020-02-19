export default {
  permission: '',
  icon: 'el-icon-eleme',
  path: '/module',
  name: 'module',
  meta: {
    title: '模块管理',
    component: () => import(/* webpackChunkName: "module" */ '@/views/pages/demo')
  }
}

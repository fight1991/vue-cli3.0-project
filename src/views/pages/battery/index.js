export default {
  permission: '',
  icon: 'el-icon-eleme',
  path: '/battery',
  name: 'battery',
  meta: {
    title: '电池管理',
    component: () => import(/* webpackChunkName: "battery" */ '@/views/pages/demo')
  }
}

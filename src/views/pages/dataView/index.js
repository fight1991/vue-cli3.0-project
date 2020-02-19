export default {
  permission: '',
  icon: 'el-icon-eleme',
  path: '/dataView',
  name: 'data-view',
  meta: {
    title: '数据概览',
    component: () => import(/* webpackChunkName: "data-view" */ '@/views/pages/demo')
  }
}

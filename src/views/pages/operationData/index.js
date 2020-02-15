export default {
  permission: '',
  icon: 'el-icon-eleme',
  path: 'workData',
  name: 'workData',
  meta: {
    title: '工作数据',
    component: () => import(/* webpackChunkName: "workData" */ '@/views/pages/demo')
  }
}

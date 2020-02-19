export default {
  permission: '',
  icon: 'el-icon-eleme',
  path: '/message',
  name: 'message',
  meta: {
    title: '消息系统',
    component: () => import(/* webpackChunkName: "message" */ '@/views/pages/demo')
  }
}

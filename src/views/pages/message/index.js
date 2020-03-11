export default {
  permission: '',
  icon: 'icon-xiaoxi',
  path: '/bus/message',
  name: 'bus-message',
  meta: {
    title: '消息系统',
    component: () => import(/* webpackChunkName: "bus-message" */ '@/views/pages/demo')
  }
}

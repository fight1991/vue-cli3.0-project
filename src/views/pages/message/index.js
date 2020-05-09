export default {
  permission: '',
  icon: 'icon-xiaoxi',
  path: '/bus/message',
  name: 'bus-message',
  meta: {
    title: 'infoSys',
    component: () => import(/* webpackChunkName: "bus-message" */ '@/views/pages/demo')
  }
}

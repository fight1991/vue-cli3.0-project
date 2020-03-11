export default {
  permission: '',
  icon: 'icon-module',
  path: '/bus/module',
  name: 'bus-module',
  meta: {
    title: '模块管理',
    component: () => import(/* webpackChunkName: "bus-module" */ '@/views/pages/demo')
  }
}

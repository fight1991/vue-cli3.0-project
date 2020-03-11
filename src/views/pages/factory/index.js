export default {
  permission: '',
  icon: 'icon-factory',
  path: '/bus/factory',
  name: 'bus-factory',
  meta: {
    title: '工厂管理',
    component: () => import(/* webpackChunkName: "bus-factory" */ '@/views/pages/demo')
  }
}
